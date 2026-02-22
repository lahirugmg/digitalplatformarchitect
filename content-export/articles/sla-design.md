---
title: 'SLA Design: Defining Service Level Objectives and Error Budgets'
summary: 'Learn how to define meaningful SLOs, choose appropriate SLIs, calculate error budgets, and build a culture of reliability engineering.'
publishedAt: '2026-02-22'
featured: true
tags: ['SLO', 'SLA', 'Reliability', 'Production', 'Monitoring', 'Operations']
---

# SLA Design: Defining Service Level Objectives and Error Budgets

Service Level Objectives (SLOs) are the foundation of reliable systems. They provide a quantifiable target for service reliability, create a shared language between engineering and business stakeholders, and enable data-driven decisions about feature velocity versus reliability investments.

This article explains how to define effective SLOs, select appropriate Service Level Indicators (SLIs), calculate error budgets, and use them to drive operational excellence.

## Understanding the SLx Hierarchy

### SLI (Service Level Indicator)
**What it is:** A carefully chosen metric that represents the health of your service from the user's perspective.

**Examples:**
- Availability: Percentage of successful requests (non-5xx responses)
- Latency: 95th percentile response time
- Throughput: Requests processed per second
- Correctness: Percentage of requests returning accurate results

**Key principle:** SLIs should measure what users care about, not what's easy to measure.

### SLO (Service Level Objective)
**What it is:** A target value or range for an SLI over a specific time period.

**Examples:**
- "99.9% of requests will return non-5xx responses over a 30-day period"
- "95th percentile latency will be under 200ms over a 7-day rolling window"
- "99.95% of messages will be delivered within 1 second over a 28-day period"

**Key principle:** SLOs should be realistic, measurable, and aligned with user expectations.

### SLA (Service Level Agreement)
**What it is:** A business contract with consequences (typically financial) if SLOs are not met.

**Examples:**
- "We guarantee 99.9% availability. If we fail to meet this, you receive 10% service credit."
- Internal SLAs might have consequences like pager duty or change freezes instead of financial penalties.

**Key principle:** SLAs should be less strict than SLOs to provide engineering margin for error.

## Choosing the Right SLIs

### The User Journey Approach

1. **Map critical user journeys**
   - User signs up and creates account
   - User searches for products
   - User completes checkout
   - User receives order confirmation

2. **Identify key interactions**
   - Which API calls are made?
   - What's the expected response time?
   - What constitutes success vs. failure?

3. **Define SLIs for each journey**
   - Authentication API: availability + latency
   - Search API: availability + latency + relevance
   - Payment API: availability + latency + durability
   - Email service: delivery rate + latency

### SLI Selection Criteria

✅ **Good SLIs:**
- Measure user-visible behavior
- Directly correlate with user happiness
- Can be measured accurately
- Respond quickly to system degradation
- Cover critical paths, not edge cases

❌ **Poor SLIs:**
- Infrastructure metrics (CPU, memory) without correlation to user experience
- Metrics that are too volatile (change dramatically minute-to-minute)
- Metrics that can't be directly controlled
- Vanity metrics that don't reflect real user pain

### Common SLI Types

| SLI Type | Use Case | Measurement | Example Target |
|----------|----------|-------------|----------------|
| **Availability** | User-facing APIs, web services | (successful_requests / total_requests) × 100 | 99.9% |
| **Latency** | Interactive services | p95 or p99 response time | p95 < 200ms |
| **Durability** | Data storage, backups | (successful_writes / total_writes) × 100 | 99.999% |
| **Correctness** | Search, recommendations | (accurate_results / total_results) × 100 | 95% |
| **Freshness** | Caches, dashboards | age of most recent data update | < 5 minutes |
| **Throughput** | Batch processing | records processed per hour | > 1M/hour |

## Setting SLO Targets

### The 100% Trap

**Don't aim for 100% availability.** Here's why:

1. **Impossible to achieve:** Even the most reliable systems have dependencies (DNS, networks, cloud providers) that aren't 100% reliable
2. **Expensive:** Going from 99.9% to 99.99% can cost 10x more infrastructure
3. **Prevents innovation:** If you can never fail, you can never deploy changes
4. **User expectations mismatch:** Users often don't notice the difference between 99.9% and 99.99%, but they notice lack of features

### The "Nines" Breakdown (30-day period)

| SLO | Allowed Downtime | Use Case |
|-----|------------------|----------|
| **90%** | 72 hours | Internal dev tools, non-critical batch jobs |
| **95%** | 36 hours | Internal APIs with manual fallback |
| **99% (2-nines)** | 7.2 hours | Business applications, dashboards |
| **99.5%** | 3.6 hours | Customer-facing services with degraded mode |
| **99.9% (3-nines)** | 43.2 minutes | Critical user-facing APIs |
| **99.95%** | 21.6 minutes | Payment processing, authentication |
| **99.99% (4-nines)** | 4.3 minutes | Emergency services, financial trading |
| **99.999% (5-nines)** | 26 seconds | Life-critical systems (medical, aviation) |

### How to Set Your Target

1. **Start with current performance**
   - Measure actual reliability over last 90 days
   - Identify baseline: "We're currently at 99.7%"

2. **Understand user expectations**
   - Survey users: "How much downtime is acceptable?"
   - Analyze churn: Do outages correlate with user loss?
   - Check competitors: What are industry standards?

3. **Consider business impact**
   - What's the revenue impact of downtime?
   - Are there seasonal peaks or critical windows?
   - What's the cost of achieving higher reliability?

4. **Set achievable targets**
   - Pick a target slightly better than current baseline
   - Build in headroom: SLO should be easier to meet than SLA
   - Plan for gradual improvement over time

## Error Budgets: The Key to Balancing Speed and Reliability

### What is an Error Budget?

**Error budget = 1 - SLO**

If your SLO is 99.9% availability, your error budget is 0.1% (43.2 minutes per 30 days).

This budget can be "spent" on:
- Planned maintenance windows
- Risky deployments of new features
- Infrastructure experiments
- Acceptable levels of system degradation

### Error Budget Calculation Examples

#### Request-Based Budget
```
SLO: 99.9%
Monthly requests: 100,000,000
Error budget: 100,000,000 × 0.001 = 100,000 failed requests
```

If you experience 25,000 failures in a week, you've consumed 25% of your monthly error budget.

#### Time-Based Budget
```
SLO: 99.95%
Period: 28 days = 40,320 minutes
Error budget: 40,320 × 0.0005 = 20.16 minutes
```

A 10-minute outage consumes ~50% of your budget.

### Error Budget Policy

Define clear policies for different budget consumption thresholds:

#### 🟢 0-50% Budget Consumed
**Status:** Healthy
**Actions:**
- Continue normal deployment velocity
- Experiment with new features
- Scheduled maintenance OK
- Focus on feature development

#### 🟡 50-75% Budget Consumed
**Status:** Warning
**Actions:**
- Increase monitoring and alerting
- Review recent changes for issues
- Defer risky deployments
- Prepare incident response plans

#### 🟠 75-90% Budget Consumed
**Status:** High Risk
**Actions:**
- Reduce deployment frequency
- Focus on reliability improvements
- Cancel non-critical changes
- Increase on-call staffing

#### 🔴 90-100% Budget Consumed
**Status:** Critical
**Actions:**
- Implement change freeze (no new features)
- All hands on reliability work
- Root cause analysis of all incidents
- Defer all non-critical work until budget recovers

### Using Error Budgets to Drive Decisions

**Scenario 1: Feature launch decision**
- Q: Should we launch this risky new feature?
- A: Check error budget. If 70% consumed, defer launch. If 20% consumed, proceed with extra monitoring.

**Scenario 2: Infrastructure upgrade**
- Q: Should we upgrade database version mid-month?
- A: Calculate risk. If upgrade historically has 5% failure rate and would consume 15% of budget on failure, check current consumption first.

**Scenario 3: Incident response**
- Q: How urgent is this 2% error rate increase?
- A: Calculate burn rate. 2% errors against 99.9% SLO = 20x burn rate. At this rate, budget exhausts in 5% of period (1.5 days). **Critical priority.**

## Burn Rate: The Early Warning System

### What is Burn Rate?

**Burn rate = observed_error_rate / (1 - SLO)**

Burn rate tells you how fast you're consuming your error budget.

### Examples

| SLO | Current Error Rate | Burn Rate | Time to Budget Exhaustion |
|-----|-------------------|-----------|---------------------------|
| 99.9% | 0.1% | 1x | Full period (30 days) |
| 99.9% | 0.5% | 5x | 20% of period (6 days) |
| 99.9% | 1.0% | 10x | 10% of period (3 days) |
| 99.9% | 2.0% | 20x | 5% of period (36 hours) |

### Multi-Window Burn Rate Alerts

Set up alerts at different time windows to catch both fast and slow burns:

#### 1-Hour Window (Fast Burn)
- **Threshold:** 14.4x burn rate
- **Interpretation:** At this rate, budget exhausts in 2 days
- **Action:** Page on-call immediately

#### 6-Hour Window (Medium Burn)
- **Threshold:** 6x burn rate
- **Interpretation:** At this rate, budget exhausts in 5 days
- **Action:** Escalate to senior engineer

#### 3-Day Window (Slow Burn)
- **Threshold:** 2x burn rate
- **Interpretation:** At this rate, budget exhausts in 15 days
- **Action:** Create incident ticket, investigate during business hours

### Example Alert Policy

```yaml
# Alerting policy for 99.9% SLO with 30-day window

fast_burn:
  window: 1h
  threshold: 14.4x
  severity: critical
  action: page_on_call

medium_burn:
  window: 6h
  threshold: 6x
  severity: warning
  action: escalate_engineer

slow_burn:
  window: 72h
  threshold: 2x
  severity: info
  action: create_ticket
```

## Measuring and Monitoring SLOs

### SLO Dashboard Requirements

Every service should have a dashboard showing:

1. **Current SLI value** (real-time)
2. **SLO target line** (static threshold)
3. **Error budget remaining** (percentage and absolute)
4. **Burn rate** (current, 1h, 6h, 24h windows)
5. **Historical trend** (last 7/28/90 days)
6. **Recent incidents** (annotated on timeline)

### Measurement Best Practices

#### Use Client-Side Measurements When Possible
- Server says: "200 OK in 50ms" ✓
- User experiences: "Timeout after 30 seconds" ✗
- **Use:** Synthetic monitoring, RUM (Real User Monitoring), client SDKs

#### Define "Good" Events Explicitly
```python
# Bad: Count everything that didn't 5xx
good_requests = total_requests - 5xx_count

# Good: Explicitly define what "good" means
good_requests = (
  status_code in [200, 201, 204]
  AND latency < 200ms
  AND response_size > 0
)
```

#### Handle Edge Cases
- Requests during deploys: Count or exclude? (Usually count)
- Planned maintenance: Exclude from SLO calculation with documented process
- DDoS attacks: Usually count (your users still can't access the service)

### Common Measurement Pitfalls

❌ **Measuring at the wrong layer**
- Don't measure load balancer health checks (not user traffic)
- Don't measure internal retries (user sees only final result)

❌ **Survivorship bias**
- Don't only measure requests that reached your server
- Include connection failures, DNS failures, TLS failures

❌ **Averaging instead of percentiles**
- Average latency: 50ms (great!)
- p99 latency: 10 seconds (terrible!)
- **Use p95/p99 for latency SLIs**

## SLO-Driven Culture

### Blameless Postmortems

When SLO is violated:

1. **What happened?** (timeline of events)
2. **What was the user impact?** (measured against SLI)
3. **How much error budget was consumed?**
4. **What was the root cause?**
5. **What are the action items?** (with owners and deadlines)
6. **What did we learn?** (systemic improvements)

**Never:** Who is responsible? Who should be punished?

### Error Budget-Based Decision Making

**Product Manager:** "We need to ship this feature by Friday for the marketing launch."

**Engineering:** "We've consumed 85% of our error budget this month. We're in change freeze per our error budget policy."

**PM:** "Is there any way we can still ship?"

**Eng:** "We can ship if you accept the risk of violating SLO and triggering SLA credits. Let's calculate the business tradeoff..."

This conversation is **data-driven** instead of emotional.

### Continuous Improvement

SLOs aren't set in stone:

- **Review quarterly:** Are SLOs still aligned with user needs?
- **Tighten gradually:** As reliability improves, raise targets
- **Adjust based on data:** If you consistently exceed SLO by wide margin, either tighten it or invest less in reliability
- **Deprecate irrelevant SLIs:** User needs change over time

## Getting Started: Your First SLO

### Week 1: Baseline Measurement
1. Pick ONE critical user journey
2. Define 1-2 SLIs (usually availability + latency)
3. Measure current performance for 7 days
4. Don't set targets yet—just observe

### Week 2: Set Conservative Target
1. Set SLO target at current p50 performance (50th percentile)
2. Calculate error budget
3. Set up basic monitoring dashboard
4. Communicate to team: "We're experimenting with SLOs"

### Week 3-4: Observe and Adjust
1. Did you meet the SLO? Easily or barely?
2. Did any incidents violate it?
3. Adjust target to something realistic but aspirational
4. Add error budget policy (what happens at 50%/75%/90% consumption)

### Month 2: Expand Coverage
1. Add SLOs for 2-3 more critical services
2. Set up multi-window burn rate alerts
3. Practice incident response using error budget
4. Run first monthly SLO review meeting

### Month 3-6: Operationalize
1. Make SLOs part of architecture review process
2. Include error budget status in sprint planning
3. Tie postmortem action items to SLO improvement
4. Start publishing SLO compliance externally (status page)

## Conclusion

Effective SLO design is about finding the balance between:
- **Reliability and velocity:** Error budgets let you move fast when you have budget, slow down when you don't
- **Engineering effort and user happiness:** Don't over-invest in reliability users won't notice
- **Quantitative and qualitative:** Combine metrics with user feedback

Start simple, measure real user impact, and iterate based on data. SLOs are a journey, not a destination.

---

## Further Reading

- Google SRE Book: "Service Level Objectives" (Chapter 4)
- "Implementing Service Level Objectives" by Alex Hidalgo
- [SLO Workshop](https://landing.google.com/sre/resources/practicesandprocesses/slo-workshop/)

## Try It Yourself

Ready to define SLOs for your service?

👉 **[Launch the SLA & Availability Targets Playground](/playgrounds/production-readiness/sla-calculator)**

Define your SLIs, set SLO targets, calculate error budgets, and simulate incident scenarios to see if your architecture can meet your reliability goals.
