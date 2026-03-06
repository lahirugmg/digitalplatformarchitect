'use client'

import { useState, useEffect, useCallback } from 'react'

type BreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN'

export default function ResiliencyPlayground() {
    const [trafficLevel, setTrafficLevel] = useState(1) // 1-10 req/s
    const [activeRequests, setActiveRequests] = useState<number[]>([])

    // Circuit Breaker State
    const [breakerState, setBreakerState] = useState<BreakerState>('CLOSED')
    const [failureCount, setFailureCount] = useState(0)
    const FAILURE_THRESHOLD = 5

    // Downstream Service State
    const [serviceHealth, setServiceHealth] = useState(100) // 0-100% capacity
    const [logs, setLogs] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([])

    const addLog = useCallback((message: string, type: 'success' | 'error' | 'info') => {
        setLogs(prev => [{ id: Date.now() + Math.random(), message, type }, ...prev].slice(0, 10))
    }, [])

    // Simulate Traffic
    useEffect(() => {
        let reqId = 0;
        const interval = setInterval(() => {
            reqId++;
            setActiveRequests(prev => [...prev.slice(-20), reqId])
        }, 1000 / trafficLevel)
        return () => clearInterval(interval)
    }, [trafficLevel])

    // Process Requests & Circuit Breaker Logic
    useEffect(() => {
        if (activeRequests.length === 0) return

        const processRequest = () => {
            if (breakerState === 'OPEN') {
                addLog('Request blocked by Circuit Breaker (OPEN) - Fallback returned', 'info')
                return
            }

            if (serviceHealth <= 0) {
                addLog('Request Failed - Downstream Service Unreachable', 'error')
                if (breakerState === 'CLOSED') {
                    setFailureCount(prev => prev + 1)
                } else if (breakerState === 'HALF_OPEN') {
                    addLog('Half-Open test failed. Breaker tripped to OPEN', 'error')
                    setBreakerState('OPEN')
                    setFailureCount(0)
                }
            } else {
                // Decrease health slightly under high traffic to simulate load
                if (trafficLevel > 5) {
                    setServiceHealth(prev => Math.max(0, prev - (trafficLevel * 0.5)))
                }

                addLog('Request Succeeded', 'success')

                if (breakerState === 'HALF_OPEN') {
                    addLog('Half-Open test succeeded. Breaker reset to CLOSED', 'success')
                    setBreakerState('CLOSED')
                    setFailureCount(0)
                }
            }
        }

        processRequest()
    }, [activeRequests, breakerState, serviceHealth, trafficLevel, addLog])

    // Circuit Breaker Threshold Trigger
    useEffect(() => {
        if (failureCount >= FAILURE_THRESHOLD && breakerState === 'CLOSED') {
            addLog(`Failure threshold reached (${FAILURE_THRESHOLD}). Breaker tripped to OPEN`, 'error')
            setBreakerState('OPEN')
        }
    }, [failureCount, breakerState, addLog])

    // Half-Open Timer
    useEffect(() => {
        if (breakerState === 'OPEN') {
            const timer = setTimeout(() => {
                addLog('Timeout reached. Breaker transitioned to HALF-OPEN to test backend', 'info')
                setBreakerState('HALF_OPEN')
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [breakerState, addLog])

    // Service Recovery Simulation
    useEffect(() => {
        const recoveryInterval = setInterval(() => {
            // If traffic is low, service recovers fast. If traffic is high, it struggles to recover.
            setServiceHealth(prev => Math.min(100, prev + Math.max(0, 10 - trafficLevel)))
        }, 1000)
        return () => clearInterval(recoveryInterval)
    }, [trafficLevel])


    return (
        <div className="h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-[100px]" />
            </div>

            {/* Header */}
            <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-2">
                            <span className="text-2xl">🛡️</span> Resiliency & Fault Tolerance
                        </h1>
                        <p className="text-sm sm:text-base text-slate-400 font-medium">Visualize cascading failures and Circuit Breaker patterns</p>
                    </div>
                    <a
                        href="/playgrounds"
                        className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg font-medium transition-all text-sm text-slate-300 hover:text-white flex items-center gap-2"
                    >
                        ← Back to Playgrounds
                    </a>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto relative z-10 p-4 sm:p-8">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

                    {/* Simulation Controls */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                🎮 Traffic Control
                            </h3>
                            <p className="text-sm text-slate-400 mb-6">
                                Increase the simulated traffic to overload the downstream service and observe how the Circuit Breaker responds to failures.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-300">Requests per Second (RPS)</span>
                                        <span className="font-bold text-orange-400">{trafficLevel} req/s</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1" max="20"
                                        value={trafficLevel}
                                        onChange={(e) => setTrafficLevel(parseInt(e.target.value))}
                                        className="w-full accent-orange-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>Low</span>
                                        <span>High Load</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <button className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-lg text-sm font-bold transition-all" onClick={() => setServiceHealth(0)}>
                                    💥 Trigger Outage Instantly
                                </button>
                            </div>
                        </div>

                        {/* Logs */}
                        <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-xl p-4 h-[400px] flex flex-col">
                            <h3 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">System Logs</h3>
                            <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                                {logs.map((log) => (
                                    <div key={log.id} className={`p-2 rounded border bg-opacity-10 ${log.type === 'error' ? 'text-red-400 border-red-500/20 bg-red-500' :
                                        log.type === 'success' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500' :
                                            'text-blue-400 border-blue-500/20 bg-blue-500'
                                        }`}>
                                        <span className="opacity-50 mr-2">{new Date().toISOString().split('T')[1].slice(0, 8)}</span>
                                        {log.message}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visualization Canvas */}
                    <div className="lg:col-span-2 space-y-6 flex flex-col">

                        <div className="flex-1 bg-slate-900 border border-white/10 backdrop-blur-md rounded-xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                            {/* Animated Node Paths */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-white/5 translate-y-[-50%]"></div>
                                {/* Firing packets */}
                                {trafficLevel > 0 && <div className="absolute top-1/2 left-1/4 h-2 w-16 bg-blue-400 rounded-full blur-[2px] translate-y-[-50%] animate-[packet_1s_linear_infinite]" style={{ animationDuration: `${2 / trafficLevel}s` }}></div>}
                            </div>

                            {/* Nodes */}
                            <div className="relative z-10 w-full flex justify-between items-center px-12">

                                {/* GateWay */}
                                <div className="w-32 h-32 rounded-2xl bg-blue-500/10 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col items-center justify-center p-4">
                                    <span className="text-3xl mb-2">🌐</span>
                                    <span className="text-xs font-bold text-blue-300 text-center">API Gateway</span>
                                </div>

                                {/* Circuit Breaker Component */}
                                <div className={`w-40 h-48 rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-500 ${breakerState === 'CLOSED' ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)]' :
                                    breakerState === 'OPEN' ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]' :
                                        'bg-amber-500/10 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.2)]'
                                    }`}>
                                    <span className="text-3xl mb-2">⚡</span>
                                    <span className="text-sm font-bold text-white text-center mb-1">Circuit Breaker</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full mb-3 ${breakerState === 'CLOSED' ? 'bg-emerald-500/20 text-emerald-400' :
                                        breakerState === 'OPEN' ? 'bg-red-500/20 text-red-400' :
                                            'bg-amber-500/20 text-amber-400'
                                        }`}>
                                        {breakerState}
                                    </span>

                                    {breakerState === 'CLOSED' && (
                                        <div className="w-full bg-black/40 rounded-full h-2 mt-2">
                                            <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${(failureCount / FAILURE_THRESHOLD) * 100}%` }}></div>
                                        </div>
                                    )}
                                    <span className="text-[10px] text-slate-400 mt-1">Failures: {failureCount}/{FAILURE_THRESHOLD}</span>
                                </div>

                                {/* Downstream Service */}
                                <div className={`w-36 h-36 rounded-2xl border flex flex-col items-center justify-center p-4 transition-all duration-300 ${serviceHealth > 50 ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]' :
                                    serviceHealth > 0 ? 'bg-orange-500/10 border-orange-500/50' :
                                        'bg-red-900/40 border-red-500/80'
                                    }`}>
                                    <span className={`text-3xl mb-2 transition-transform ${serviceHealth <= 0 ? 'scale-90 opacity-50 grayscale' : ''}`}>🗄️</span>
                                    <span className="text-sm font-bold text-indigo-300 text-center mb-2">Inventory API</span>
                                    <div className="w-full bg-black/40 rounded-full h-1.5">
                                        <div className={`h-1.5 rounded-full transition-all duration-300 ${serviceHealth > 50 ? 'bg-emerald-500' : serviceHealth > 10 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${serviceHealth}%` }}></div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 mt-1 font-mono">{Math.round(serviceHealth)}% Health</span>
                                </div>

                            </div>

                            {/* Concept Explanation Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                {breakerState === 'CLOSED' && (
                                    <div className="bg-emerald-900/40 border border-emerald-500/30 p-4 rounded-xl backdrop-blur-md">
                                        <p className="text-sm text-emerald-200"><strong>Normal Operation:</strong> The Circuit Breaker is closed. All traffic flows directly to the Inventory API. The breaker is monitoring failure rates.</p>
                                    </div>
                                )}
                                {breakerState === 'OPEN' && (
                                    <div className="bg-red-900/40 border border-red-500/30 p-4 rounded-xl backdrop-blur-md">
                                        <p className="text-sm text-red-200"><strong>Circuit Tripped (Fail Fast):</strong> The failure threshold was breached! The Circuit Breaker immediately blocks all traffic to prevent cascading failures to the whole system, returning a fallback response.</p>
                                    </div>
                                )}
                                {breakerState === 'HALF_OPEN' && (
                                    <div className="bg-amber-900/40 border border-amber-500/30 p-4 rounded-xl backdrop-blur-md">
                                        <p className="text-sm text-amber-200"><strong>Testing Recovery:</strong> The timeout period finished. The Circuit Breaker is allowing a small volume of test traffic through. If it succeeds, the circuit fully closes.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Global Styles for Animation */}
                        <style jsx global>{`
                @keyframes packet {
                    0% { left: 25%; opacity: 0; }
                10% {opacity: 1; }
                90% {opacity: 1; }
                100% {left: 75%; opacity: 0; }
              }
            `}</style>
                    </div>
                </div >
            </div >
        </div >
    )
}
