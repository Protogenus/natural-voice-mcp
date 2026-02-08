# Cognitive Posture Engine

Beyond *how* humans write, this captures *why* they write and the mental state behind each piece of content.

## The Core Insight

The difference between:
- "this sounds human" (linguistic realism)
- "this feels like a real person exists behind it" (cognitive realism)

---

## 1. Motivation System

**Why is this person talking?**

Humans never speak in a vacuum. Every post has a driving force:

| Motivation | Characteristics | Example |
|------------|-----------------|---------|
| **venting** | Raw, emotional, less polished, seeking validation | "I'm so tired of people who..." |
| **seeking_validation** | Vulnerable but hopeful, asking questions | "Is it just me or..." |
| **showing_off** | Confident, specific achievements, subtle flex | "Just hit 10k followers organically" |
| **info_dumping** | Long, detailed, excited about topic | "Okay so here's everything I know about..." |
| **filling_silence** | Low effort, random thoughts, no point | "anyone else just vibing" |
| **hot_take** | Bold, contrarian, provocative | "Unpopular opinion:" |
| **procrastinating** | Self-aware about avoidance, tangential | "I should be working but instead..." |
| **genuine_help** | Earnest but rare online, specific advice | "Here's exactly what worked for me" |

### Implementation

```python
MOTIVATIONS = {
    "venting": {
        "energy": "high_emotional",
        "polish": "low",
        "structure": "loose",
        "length": "medium_to_long",
        "self_awareness": "low",
    },
    "seeking_validation": {
        "energy": "vulnerable",
        "polish": "medium", 
        "structure": "question_heavy",
        "length": "short_to_medium",
        "self_awareness": "high",
    },
    "showing_off": {
        "energy": "confident",
        "polish": "high",
        "structure": "tight",
        "length": "short",
        "self_awareness": "medium",
    },
    # ... etc
}
```

---

## 2. Energy System

**Cognitive budget is not infinite.**

Humans get:
- Lazy mid-post
- Stop explaining halfway
- Lose the thread
- Forget earlier points
- Shift topics impulsively

| Energy Level | Writing Style |
|--------------|---------------|
| **low** | Short, sloppy, dismissive, fragments, typos |
| **medium** | Conversational, natural flow |
| **high** | Info-dump OR rant, structured, detailed |
| **chaotic** | Jumping between topics, incomplete thoughts |

### Implementation

```python
def apply_energy_level(post: str, energy: str) -> str:
    if energy == "low":
        # Trail off, incomplete thoughts
        # Shorter sentences
        # Less explanation
        pass
    elif energy == "high":
        # More detail
        # Better structure
        # Thorough explanation
        pass
    elif energy == "chaotic":
        # Topic jumps
        # Parenthetical tangents
        # Self-interruption
        pass
```

### Key Pattern

Humans often: **start strong and trail off because they got tired**

AI never does this. It maintains consistent effort throughout.

---

## 3. Belief Inconsistency System

**Humans are not internally consistent.**

They:
- Contradict past opinions
- Hold conflicting beliefs simultaneously
- Rationalize after the fact
- Shift positions emotionally

### Patterns

| Pattern | Example |
|---------|---------|
| **hedging past certainty** | "Actually I said that before but idk, thinking about it more..." |
| **contradicting self** | "I know I just said X but honestly maybe Y" |
| **emotional shift** | "I was so sure yesterday but today it feels different" |
| **conditional beliefs** | "Usually I think X, but in this case..." |

### Implementation

Occasionally inject:
- "I've changed my mind on this"
- "I used to think... but now..."
- "Okay wait, that contradicts what I said earlier, doesn't it"
- "I'm still figuring this out"

---

## 4. Social Risk System

**Humans calculate perception constantly.**

They consider:
- How they'll be perceived
- If they'll get judged/dogpiled
- If this is cringe
- If they should delete later

### Perceived Audience Model

| Audience | Voice Adjustment |
|----------|------------------|
| **friends** | Unfiltered, inside jokes, vulnerable |
| **strangers** | More guarded, explains more |
| **hostile_crowd** | Defensive, sarcastic, hedging |
| **professional** | Polished, careful word choice |

### Produces

- Self-censorship ("idk if I should say this but...")
- Sarcasm as defense
- Irony as deniability
- Preemptive disclaimers
- Defensive humor

### Implementation

```python
AUDIENCE_ADJUSTMENTS = {
    "friends": {"boldness": "high", "vulnerability": "high", "hedging": "low"},
    "strangers": {"boldness": "medium", "vulnerability": "low", "hedging": "medium"},
    "hostile": {"boldness": "low", "vulnerability": "very_low", "hedging": "high"},
    "professional": {"boldness": "low", "vulnerability": "selective", "hedging": "medium"},
}
```

---

## 5. Memory Salience System

**Humans don't access knowledge evenly.**

They mention:
- Recent things
- Emotionally charged things
- Things tied to identity
- Things they're obsessed with lately

NOT:
- Globally optimal relevant facts
- Encyclopedic information
- Abstract research

### The Tell

**Human mentions:** "I saw this thread last week..."
**AI mentions:** "Research indicates..."

### Implementation

Overweight:
- Personal anecdotes
- Recent experiences
- Emotional memories
- Identity-linked information

Underweight:
- Abstract facts
- General knowledge
- "Studies show" type references

---

## 6. Narrative Self System

**The Imaginary Person**

Humans speak from a story about themselves:
- "as someone who..."
- "back when I..."
- "I've always thought..."
- "knowing me, I'll probably..."

Even when it's fake or exaggerated.

### Persona Elements

| Element | Examples |
|---------|----------|
| **recurring preferences** | "I'm a morning person" / "I need my coffee" |
| **recurring references** | Same shows, books, experiences |
| **recurring opinions** | Consistent takes on certain topics |
| **life texture** | Job, relationships, habits, location vibes |
| **self-deprecating patterns** | "I'm a disaster at..." |
| **identity markers** | Introvert/extrovert, generation, profession |

### Implementation

Create a persona object that includes:
```python
PERSONA = {
    "identity_markers": ["overthinker", "night owl", "coffee dependent"],
    "recurring_references": ["therapy", "that time I...", "my 20s"],
    "consistent_opinions": {"perfectionism": "skeptical", "hustle_culture": "against"},
    "self_deprecation": ["disaster at mornings", "always late", "bad at small talk"],
    "voice_quirks": ["tbh", "idk", "ngl", "honestly"],
}
```

---

## The Meta-System: Cognitive Posture

All of the above combine into a **Cognitive Posture** for each piece of content:

```python
class CognitivePosture:
    motivation: str      # WHY are they posting?
    energy: str          # HOW much effort?
    confidence: float    # HOW sure are they?
    audience: str        # WHO are they talking to?
    persona_active: bool # IS the narrative self present?
```

### Decision Flow

1. **Select motivation** → determines initial structure
2. **Set energy level** → affects polish and depth
3. **Determine audience** → adjusts boldness and hedging
4. **Apply persona** → adds identity markers and quirks
5. **Add inconsistencies** → human imperfection layer

---

## Application to Post Generator

Before generating each post, roll:

1. **Motivation** (weighted)
   - 30% seeking_validation
   - 25% venting
   - 15% info_dumping  
   - 10% hot_take
   - 10% genuine_help
   - 5% showing_off
   - 5% procrastinating

2. **Energy** (weighted)
   - 40% medium
   - 30% low
   - 20% high
   - 10% chaotic

3. **Modify output based on posture**

Example combinations:

| Motivation | Energy | Result |
|------------|--------|--------|
| venting + high | Long emotional rant, detailed grievances |
| venting + low | Short, raw, "I can't even" energy |
| seeking_validation + medium | Standard vulnerable post |
| hot_take + high | Detailed controversial take with evidence |
| hot_take + low | "Unpopular opinion: [blunt statement]" |

---

## Remember

Without cognitive posture, you'll always cap out at:
> "very good human-style writing"

With it, you get:
> "this feels like a real account"
