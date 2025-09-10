"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import questionsData from "@/data/questions.json";

type Question = {
  id: string;
  text: string;
  type: "single" | "multiple";
  pillar: string;
  options: {
    value: string;
    text: string;
    patterns: Record<string, number | undefined>;
  }[];
};

type Answer = {
  questionId: string;
  values: string[];
};

type Contribution = {
  questionId: string;
  question: string;
  pillar: string;
  details: { option: string; delta: number }[];
  totalDelta: number;
};

type PatternScore = {
  pattern: string;
  score: number;
  normalizedScore: number;
  pillarScores: Record<string, number>;
  contributions: Contribution[];
};

type ComponentState = "intro" | "questionnaire" | "results";

const pillars = [
  { id: "api-management", name: "API Management", icon: "🔌" },
  { id: "enterprise-integration", name: "Integration", icon: "🔗" },
  { id: "iam", name: "IAM", icon: "🔐" },
  { id: "message-broker", name: "Message Broker", icon: "📮" },
  { id: "microservices-domain-services", name: "Services", icon: "⚡" },
  { id: "data-platform", name: "Data Platform", icon: "📊" }
];

export function ArchitecturePatternSelector() {
  const [state, setState] = useState<ComponentState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<PatternScore[]>([]);
  const [activePillar, setActivePillar] = useState("api-management");

  const questions = questionsData.questions as Question[];
  const patterns = questionsData.patterns;
  const pillarMappings = questionsData.pillarMappings;

  useEffect(() => {
    // Load state from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const savedAnswers = urlParams.get('answers');
    
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(decodeURIComponent(savedAnswers));
        setAnswers(parsedAnswers);
        calculateResults(parsedAnswers);
        setState("results");
      } catch (e) {
        console.error("Error parsing URL answers:", e);
      }
    }
    // analytics
    track("selector_loaded");
  }, []);

  // When moving between questions, prefill previously selected answers
  useEffect(() => {
    const q = questions[currentQuestionIndex];
    if (!q) return;
    const prev = answers.find(a => a.questionId === q.id);
    setSelectedAnswers(prev ? prev.values : []);
    // move focus to the question heading for better keyboard flow
    const el = document.getElementById(`question-${q.id}`);
    if (el) el.focus();
  }, [currentQuestionIndex]);

  const calculateResults = (allAnswers: Answer[]) => {
    const patternScores: Record<string, { total: number; pillarScores: Record<string, number>; denom: number; contributions: Contribution[] }> = {};

    // Initialize pattern scores
    Object.keys(patterns).forEach(pattern => {
      patternScores[pattern] = {
        total: 0,
        pillarScores: Object.fromEntries(pillars.map(p => [p.id, 0])) as Record<string, number>,
        denom: 0,
        contributions: []
      };
    });

    // Calculate scores and build contributions
    allAnswers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return;

      // Precompute max possible positive contribution for each pattern for this question
      const perPatternMax: Record<string, number> = {};
      Object.keys(patterns).forEach(p => {
        if (question.type === "single") {
          let max = 0;
          question.options.forEach(opt => {
            const s = opt.patterns[p];
            if (typeof s === 'number' && s > max) max = s;
          });
          perPatternMax[p] = max;
        } else {
          let sum = 0;
          question.options.forEach(opt => {
            const s = opt.patterns[p];
            if (typeof s === 'number' && s > 0) sum += s;
          });
          perPatternMax[p] = sum;
        }
      });

      // For each pattern, collect contribution from selected options
      Object.keys(patterns).forEach(p => {
        const details: { option: string; delta: number }[] = [];
        let totalDelta = 0;
        answer.values.forEach(value => {
          const option = question.options.find(opt => opt.value === value);
          if (!option) return;
          const s = option.patterns[p];
          if (typeof s === 'number' && s !== 0) {
            totalDelta += s;
            details.push({ option: option.text, delta: s });
          }
        });
        if (totalDelta !== 0) {
          patternScores[p].contributions.push({
            questionId: question.id,
            question: question.text,
            pillar: question.pillar,
            details,
            totalDelta
          });
        }
        patternScores[p].total += totalDelta;
        patternScores[p].pillarScores[question.pillar] += totalDelta;
        patternScores[p].denom += perPatternMax[p] || 0;
      });
    });

    // Convert to sorted array with normalized scores
    const sortedResults = Object.entries(patternScores)
      .map(([pattern, scores]) => ({
        pattern,
        score: scores.total,
        normalizedScore: scores.denom > 0 ? Number((scores.total / scores.denom).toFixed(3)) : 0,
        pillarScores: scores.pillarScores,
        contributions: scores.contributions
      }))
      .sort((a, b) => {
        if (b.normalizedScore !== a.normalizedScore) return b.normalizedScore - a.normalizedScore;
        return b.score - a.score;
      })
      .slice(0, 3);

    setResults(sortedResults);

    // Track analytics
    track("view_results", {
      patterns: sortedResults.map(r => r.pattern).join(","),
      scores: sortedResults.map(r => r.score).join(","),
      normalized: sortedResults.map(r => r.normalizedScore).join(",")
    });
  };

  const handleAnswer = (values: string[]) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      values
    };

    const newAnswers = [...answers.filter(a => a.questionId !== newAnswer.questionId), newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
    } else {
      calculateResults(newAnswers);
      setState("results");
      
      // Update URL with results
      const answersParam = encodeURIComponent(JSON.stringify(newAnswers));
      window.history.pushState({}, '', `?answers=${answersParam}`);
    }

    // analytics
    track("answer_question", { id: newAnswer.questionId, values: values.join(",") });
  };

  const handleOptionSelect = (value: string) => {
    const question = questions[currentQuestionIndex];
    
    if (question.type === "single") {
      setSelectedAnswers([value]);
    } else {
      setSelectedAnswers(prev => 
        prev.includes(value) 
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    }
  };

  const resetQuestionnaire = () => {
    setState("intro");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswers([]);
    setResults([]);
    window.history.pushState({}, '', window.location.pathname);
    track("retake");
  };

  const exportResults = () => {
    const markdown = generateMarkdownReport();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-pattern-recommendations.md';
    a.click();
    URL.revokeObjectURL(url);
    
    // Track analytics
    track("export_summary");
  };

  const generateMarkdownReport = () => {
    const topPatterns = results.slice(0, 3);
    let markdown = `# Architecture Pattern Recommendations\n\n`;

    // coverage
    const answered = answers.length;
    const total = questions.length;
    markdown += `Generated on: ${new Date().toLocaleDateString()}\\n`;
    markdown += `Coverage: ${answered}/${total} questions answered\\n\\n`;

    markdown += `## Top Recommended Patterns\n\n`;
    
    topPatterns.forEach((result, index) => {
      const pattern = patterns[result.pattern as keyof typeof patterns];
      markdown += `### ${index + 1}. ${pattern.name} (Raw: ${result.score}, Normalized: ${(result.normalizedScore * 100).toFixed(0)}%)\\n\\n`;
      markdown += `${pattern.description}\\n\\n`;
      
      if (result.contributions.length) {
        markdown += `#### Rationale\\n`;
        result.contributions.forEach(c => {
          const entries = c.details.map(d => `${d.delta > 0 ? '+' : ''}${d.delta} from \"${d.option}\"`).join('; ');
          markdown += `- ${c.question}: ${entries}\\n`;
        });
        markdown += `\\n`;
      }

      // Add pillar-specific recommendations
      pillars.forEach(pillar => {
        const score = result.pillarScores[pillar.id];
        if (score > 0) {
          markdown += `**${pillar.name}:** Score ${score}\\n`;
          markdown += getPillarRecommendations(pillar.id, result.pattern) + '\\n\\n';
        }
      });
    });
    
    return markdown;
  };

  const getPillarRecommendations = (pillarId: string, pattern: string) => {
    const mapping = pillarMappings[pillarId as keyof typeof pillarMappings];
    if (!mapping) return "";
    
    let recommendations = `- Building Blocks: ${mapping.buildingBlocks.map(b => `[${b}](/blocks/${b})`).join(', ')}\n`;
    recommendations += `- Blueprints: ${mapping.blueprints.map(b => `[${b}](/blueprints/${b})`).join(', ')}\n`;
    
    return recommendations;
  };

  const [copied, setCopied] = useState(false);
  const shareResults = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    track("share_link");
  };

  const trackPillarLink = (pillarId: string, linkType: 'building-block' | 'blueprint', target: string) => {
    const eventMap: Record<string, string> = {
      'api-management': 'open_api_mgmt_link',
      'enterprise-integration': 'open_integration_link', 
      'iam': 'open_iam_link',
      'message-broker': 'open_message_broker_link',
      'microservices-domain-services': 'open_services_link',
      'data-platform': 'open_data_platform_link'
    };
    
    const eventName = eventMap[pillarId];
    if (eventName) {
      track(eventName, { linkType, target });
    }
  };

  if (state === "intro") {
    return (
      <div className="pattern-selector">
        <div className="intro-section">
          <div className="card">
            <h2>Welcome to the Architecture Pattern Selector</h2>
            <p>
              This tool will help you choose the most suitable architectural patterns for your system 
              based on your specific requirements and constraints.
            </p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">❓</span>
                <div>
                  <h3>Interactive Questionnaire</h3>
                  <p>Answer questions about scale, team structure, and technical needs</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <div>
                  <h3>Personalized Recommendations</h3>
                  <p>Get top 3 pattern recommendations with detailed rationale</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🏗️</span>
                <div>
                  <h3>Six Platform Pillars</h3>
                  <p>Guidance across API Management, Integration, IAM, Messaging, Services, and Data</p>
                </div>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => { setState("questionnaire"); track("start_assessment"); }}
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state === "questionnaire") {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const onSkip = () => {
      // Move forward without recording an answer for this question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswers([]);
        track("skip_question", { id: question.id });
      } else {
        calculateResults(answers);
        setState("results");
      }
    };

    return (
      <div className="pattern-selector">
            <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-valuetext={`Question ${currentQuestionIndex + 1} of ${questions.length}`}>
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="question-section">
              <div className="card">
              <div className="question-header">
                <span className="question-number">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              <h2 id={`question-${question.id}`} tabIndex={-1}>{question.text}</h2>
                <p className="question-pillar">Pillar: {pillars.find(p => p.id === question.pillar)?.name}</p>
              </div>
            <div aria-live="polite" className="sr-only">Question {currentQuestionIndex + 1} of {questions.length}</div>
            
            <fieldset className="options" role="group" aria-labelledby={`question-${question.id}`}>
              <legend className="sr-only">{question.text}</legend>
              {question.options.map(option => (
                <label 
                  key={option.value} 
                  className={`option ${selectedAnswers.includes(option.value) ? 'selected' : ''}`}
                >
                  <input
                    type={question.type === "single" ? "radio" : "checkbox"}
                    name={question.id}
                    value={option.value}
                    checked={selectedAnswers.includes(option.value)}
                    onChange={() => handleOptionSelect(option.value)}
                    aria-describedby={`option-${option.value}-desc`}
                  />
                  <span className="option-text" id={`option-${option.value}-desc`}>{option.text}</span>
                </label>
              ))}
            </fieldset>
            
            <div className="question-actions">
              {currentQuestionIndex > 0 && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                >
                  Previous
                </button>
              )}
              <button 
                className="btn btn-outline"
                onClick={onSkip}
              >
                Skip
              </button>
              <button 
                className="btn btn-primary"
                disabled={selectedAnswers.length === 0}
                onClick={() => handleAnswer(selectedAnswers)}
              >
                {currentQuestionIndex === questions.length - 1 ? "Get Results" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results state
  return (
    <div className="pattern-selector">
      <div className="results-section">
        <div className="results-header">
          <h2>Your Architecture Pattern Recommendations</h2>
          <div className="results-actions">
            <button className="btn btn-secondary" onClick={shareResults}>
              📋 Share
            </button>
            <button className="btn btn-secondary" onClick={exportResults}>
              📄 Export
            </button>
            <button className="btn btn-outline" onClick={resetQuestionnaire}>
              🔄 Retake
            </button>
          </div>
          {copied && <div className="toast">Link copied</div>}
        </div>

        {/* Confidence indicator */}
        {(() => {
          const answered = answers.length;
          const total = questions.length;
          const notSureCount = answers.reduce((acc, a) => {
            const q = questions.find(q => q.id === a.questionId);
            const sel = q ? q.options.filter(o => a.values.includes(o.value)) : [];
            const containsWeak = sel.some(o => /not_sure|minimal/i.test(o.value));
            return acc + (containsWeak ? 1 : 0);
          }, 0);
          const base = total ? answered / total : 0;
          const confidence = Math.max(0, Math.min(1, base * (1 - (notSureCount / Math.max(1, answered)) * 0.4)));
          const label = confidence > 0.8 ? 'High' : confidence > 0.5 ? 'Medium' : 'Low';
          return (
            <div className="confidence">
              <span>Confidence: {label} ({Math.round(confidence * 100)}%)</span>
            </div>
          );
        })()}

        <div className="top-patterns">
          {results.map((result, index) => {
            const pattern = patterns[result.pattern as keyof typeof patterns];
            return (
              <div key={result.pattern} className="pattern-card">
                <div className="pattern-rank">#{index + 1}</div>
                <div className="pattern-info">
                  <h3>
                    <Link href={`/patterns/${pattern.slug}`} onClick={() => track('open_pattern_link', { slug: pattern.slug })}>
                      {pattern.name}
                    </Link>
                  </h3>
                  <p>{pattern.description}</p>
                  <div className="pattern-score">Score: {result.score} &middot; Normalized: {(result.normalizedScore * 100).toFixed(0)}%</div>
                  {result.contributions.length > 0 && (
                    <div className="contributions">
                      <h4>Why this recommendation</h4>
                      <ul>
                        {result.contributions.slice(0, 4).map((c) => (
                          <li key={c.questionId}>
                            <strong>{c.question}</strong>: {c.details.map(d => `${d.delta > 0 ? '+' : ''}${d.delta} from "${d.option}"`).join('; ')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pillar-tabs">
          <div className="tab-nav" role="tablist" aria-label="Platform Pillars">
            {pillars.map(pillar => (
              <button
                key={pillar.id}
                className={`tab-btn ${activePillar === pillar.id ? 'active' : ''}`}
                onClick={() => setActivePillar(pillar.id)}
                role="tab"
                id={`tab-${pillar.id}`}
                aria-selected={activePillar === pillar.id}
                aria-controls={`panel-${pillar.id}`}
              >
                <span className="tab-icon" aria-hidden="true">{pillar.icon}</span>
                <span className="tab-name">{pillar.name}</span>
              </button>
            ))}
          </div>

          <div className="tab-content" role="tabpanel" id={`panel-${activePillar}`} aria-labelledby={`tab-${activePillar}`}>
            <h3>{pillars.find(p => p.id === activePillar)?.name} Recommendations</h3>
            
            {results.map((result, index) => {
              const pattern = patterns[result.pattern as keyof typeof patterns];
              const pillarScore = result.pillarScores[activePillar];
              
              if (pillarScore <= 0) return null;
              
              return (
                <div key={result.pattern} className="pillar-recommendation">
                  <h4>
                    #{index + 1} {pattern.name} 
                    <span className="pillar-score">(Score: {pillarScore})</span>
                  </h4>
                  
                  <div className="recommendations">
                    <div className="recommendation-section">
                      <h5>🏗️ Building Blocks</h5>
                      <ul>
                        {(pillarMappings[activePillar as keyof typeof pillarMappings]?.buildingBlocks || []).map(block => (
                          <li key={block}>
                            <a 
                              href={`/blocks/${block}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackPillarLink(activePillar, 'building-block', block)}
                            >
                              {block.charAt(0).toUpperCase() + block.slice(1).replace(/-/g, ' ')}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="recommendation-section">
                      <h5>📋 Blueprints</h5>
                      <ul>
                        {(pillarMappings[activePillar as keyof typeof pillarMappings]?.blueprints || []).map(blueprint => (
                          <li key={blueprint}>
                            <a 
                              href={`/blueprints/${blueprint}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackPillarLink(activePillar, 'blueprint', blueprint)}
                            >
                              {blueprint.charAt(0).toUpperCase() + blueprint.slice(1).replace(/-/g, ' ')}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="recommendation-section">
                      <h5>💡 Key Considerations</h5>
                      <ul>
                        <li>Consider trade-offs between complexity and flexibility</li>
                        <li>Evaluate team readiness and operational capabilities</li>
                        <li>Plan for gradual migration and incremental adoption</li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
