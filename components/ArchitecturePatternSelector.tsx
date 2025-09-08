"use client";

import { useState, useEffect } from "react";
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

type PatternScore = {
  pattern: string;
  score: number;
  pillarScores: Record<string, number>;
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
  }, []);

  const calculateResults = (allAnswers: Answer[]) => {
    const patternScores: Record<string, { total: number; pillarScores: Record<string, number> }> = {};
    
    // Initialize pattern scores
    Object.keys(patterns).forEach(pattern => {
      patternScores[pattern] = { 
        total: 0, 
        pillarScores: Object.fromEntries(pillars.map(p => [p.id, 0])) 
      };
    });

    // Calculate scores based on answers
    allAnswers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return;

      answer.values.forEach(value => {
        const option = question.options.find(opt => opt.value === value);
        if (!option) return;

        Object.entries(option.patterns).forEach(([pattern, score]) => {
          if (patternScores[pattern] && typeof score === 'number') {
            patternScores[pattern].total += score;
            patternScores[pattern].pillarScores[question.pillar] += score;
          }
        });
      });
    });

    // Convert to sorted array
    const sortedResults = Object.entries(patternScores)
      .map(([pattern, scores]) => ({
        pattern,
        score: scores.total,
        pillarScores: scores.pillarScores
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Top 3 patterns

    setResults(sortedResults);
    
    // Track analytics
    track("view_results", {
      patterns: sortedResults.map(r => r.pattern).join(","),
      scores: sortedResults.map(r => r.score).join(",")
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
    
    markdown += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    markdown += `## Top Recommended Patterns\n\n`;
    
    topPatterns.forEach((result, index) => {
      const pattern = patterns[result.pattern as keyof typeof patterns];
      markdown += `### ${index + 1}. ${pattern.name} (Score: ${result.score})\n\n`;
      markdown += `${pattern.description}\n\n`;
      
      // Add pillar-specific recommendations
      pillars.forEach(pillar => {
        const score = result.pillarScores[pillar.id];
        if (score > 0) {
          markdown += `**${pillar.name}:** Score ${score}\n`;
          markdown += getPillarRecommendations(pillar.id, result.pattern) + '\n\n';
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

  const shareResults = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could show a toast notification here
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
              onClick={() => setState("questionnaire")}
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

    return (
      <div className="pattern-selector">
        <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question-section">
          <div className="card">
            <div className="question-header">
              <span className="question-number">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <h2 id={`question-${question.id}`}>{question.text}</h2>
              <p className="question-pillar">Pillar: {pillars.find(p => p.id === question.pillar)?.name}</p>
            </div>
            
            <div className="options" role="group" aria-labelledby={`question-${question.id}`}>
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
            </div>
            
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
        </div>

        <div className="top-patterns">
          {results.map((result, index) => {
            const pattern = patterns[result.pattern as keyof typeof patterns];
            return (
              <div key={result.pattern} className="pattern-card">
                <div className="pattern-rank">#{index + 1}</div>
                <div className="pattern-info">
                  <h3>
                    <a href={`/patterns/${pattern.slug}`} target="_blank" rel="noopener noreferrer">
                      {pattern.name}
                    </a>
                  </h3>
                  <p>{pattern.description}</p>
                  <div className="pattern-score">Score: {result.score}</div>
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