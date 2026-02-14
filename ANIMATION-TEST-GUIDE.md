# Animation Test Guide

## How to Test Data Flow Animations

### Step-by-Step Testing:

1. **Refresh your browser** at http://localhost:3000/playgrounds/data-pipeline

2. **Build a simple pipeline:**
   - Drag **"IoT Sensors"** from left sidebar to canvas
   - Drag **"Kafka"** to the right of IoT Sensors
   - **Connect them**: Click and drag from the right edge of IoT Sensors to the left edge of Kafka

3. **Click "Run Pipeline"** button (top right)

### What You Should See:

#### ✅ **Immediate Visual Changes:**
- Edges should get **thicker** (showing throughput)
- Edges should become **more opaque** (0.6 opacity vs 0.3 when idle)
- **Blue pulsing badge** appears bottom-left saying "Pipeline Running"
- **Metrics appear** in right panel showing throughput, latency, quality, cost

#### ✅ **Animated Effects (Multiple Layers):**

1. **ReactFlow Built-in Animation:**
   - You should see **moving dashes** along the connection line
   - This is a fallback and should be immediate

2. **CSS Dash Animation:**
   - An overlay with **flowing dashed pattern**
   - Moves in direction of data flow
   - Creates "water flowing" effect

3. **SVG Particle Circles:**
   - **4 glowing circles** that travel along the path
   - They appear, pulse bigger, then fade out
   - Staggered timing (0s, 0.75s, 1.5s, 2.25s delays)
   - Take 3 seconds to complete the journey
   - Repeat infinitely while running

### Troubleshooting:

**If you don't see ANY animation:**

1. **Check the browser console** (F12) for errors
2. **Verify the edge is actually created** - you should see a line between nodes
3. **Try connecting different nodes** - some connections might be marked invalid
4. **Check that "Run Pipeline" button is red** (meaning it's running)

**If you see dashes but no particles:**

- **This is actually working!** The dashed animation IS the water flow
- SVG particles are an enhancement that may not render in all browsers
- The combination of:
  - Moving dashes (ReactFlow built-in)
  - Animated dash offset (CSS)
  - Pulsing particles (SVG)

  All create the "water flowing" effect together

### Expected Visual Flow:

```
Idle State:
- Thin lines (3px)
- Low opacity (0.3)
- Static

↓ Click "Run Pipeline" ↓

Running State:
- Thicker lines (3-10px based on throughput)
- Higher opacity (0.6)
- Animated moving dashes →
- Glowing particles traveling along path ○→○→○
- Throughput labels showing "XX.XK/s"
```

### Advanced Testing:

**Test different pipeline configurations:**

1. **Simple path:** IoT → Kafka → Data Lake
   - Should see steady flow

2. **Complex path:** IoT → Kafka → Transformation → Data Lake → Analytics
   - More processing steps = lower throughput
   - Edges might get thinner (less throughput)

3. **Multiple sources:** Add REST API and Database CDC as additional sources
   - Different paths can have different flow rates

4. **Invalid connection:** Try connecting IoT Sensors directly to Data Lake
   - Should see **RED dashed line** with warning message
   - No flow animation on invalid connections

### Color Coding to Test:

**Build pipeline and watch quality changes:**
- Start with simple IoT → Kafka → Lake (should be **BLUE** - 95% quality)
- Add Transformation nodes (quality drops to 85% - becomes **CYAN**)
- Add more transformations (quality drops to 75% - becomes **AMBER**)

### What Each Animation Layer Does:

1. **Built-in ReactFlow `animated`**
   - Simple moving dashes
   - Reliable fallback
   - Works in all browsers

2. **CSS `flowAnimation`**
   - Smooth dash offset animation
   - Creates continuous flowing effect
   - Defined in globals.css

3. **SVG `animateMotion`**
   - Particles that follow the exact path
   - Most realistic "water droplet" effect
   - May not work in older browsers

---

## Quick Debug Commands:

**Open browser console and type:**

```javascript
// Check if edges have isRunning flag
console.log(document.querySelectorAll('.react-flow__edge'))

// Check for animation elements
console.log(document.querySelectorAll('circle'))
```

---

## Success Criteria:

✅ **Minimum (Working):**
- Lines get thicker when running
- Lines get more opaque
- You see SOME kind of movement/animation

✅ **Good (Expected):**
- Moving dashed pattern
- Throughput labels appear
- Metrics update in right panel

✅ **Perfect (Full Feature):**
- Glowing particles travel along paths
- Smooth pulsing effect
- Color changes based on quality
- Multiple visual layers combine for "water flow" effect

---

**If you're seeing the dashed line animation, it's working!** The particles are a nice-to-have enhancement. The key is seeing:
1. Visual state change (thickness, opacity)
2. SOME movement along the connection
3. Metrics updating

Try it now and let me know what you see! 🌊
