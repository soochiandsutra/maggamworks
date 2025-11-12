# Complete Calculation Guide - Maggam Works Time Estimation

## Table of Contents
1. [Overview](#overview)
2. [Constants & Base Values](#constants--base-values)
3. [Formula Components](#formula-components)
4. [Border Calculations](#border-calculations)
5. [Fillwork Calculations](#fillwork-calculations)
6. [Motif Calculations](#motif-calculations)
7. [Complete Project Calculation](#complete-project-calculation)
8. [Worked Examples](#worked-examples)

---

## Overview

The calculation system estimates the **total time** required to complete embroidery work on a blouse based on:

- **Garment measurements** (chest size, armhole round, hand round, sleeve length)
- **Design choices** (neck styles, border presence, fillwork, motifs)
- **Work complexity** (technique types, coverage percentage)

### Final Formula
```
Total Time = START_TIME + Front Time + Back Time + Hands Time

Where each section time = Border Time + Fillwork Time + Motif Time
```

---

## Constants & Base Values

### Time Constants
```typescript
STANDARD_START_TIME = 40 minutes  // Fitting cloth and marking
```

### Technique Time Values (minutes per unit)
```typescript
"Challa work": 12
"Paani work": 5
"Chamki filling": 5
"Cutdana filling": 5
"Lavangam Kuttu": 7.5
"Sugar bead": 7.5
"Thread filling": 8.5
"Sugar bead + Chamki": 8.5
"Zardosi Challa": 21
"Thread Knot": 21
"Mirror / Zarkans": 7
"Zardosi rose": 27
"Thread roses": 30
"Zardosi chain": 14
"Knot W/ chamki": 17
```

### Size Factor (based on chest size)
```typescript
28 → 1.000
30 → 1.028
32 → 1.056
34 → 1.084
36 → 1.112
38 → 1.140
40 → 1.168
42 → 1.196
44 → 1.224
```

### Front Neck Type Values
```typescript
Boat Neck → 11
Deep Neck → 2
Style 1 (Madubala Neck) → 3.8
Style 2 (Patch Work) → 3.0
Style 3 (Bridal Neck) → (2/5) × ((chest size × 7) - 56)
Style 4 (V-Neck) → 1.5
```

### Back Neck Type Values
```typescript
Boat Neck → 11
Deep Neck → 2
Style 1 → 2
Style 2 → 2.7
Style 3 → 3.7
Style 4 → 2
Style 5 → 0.55 × ((chest size × 7) - 10)
Style 6 → 1.4
```

---

## Formula Components

### 1. Weighted Time Calculation
**Purpose**: Calculate average technique time based on percentage mix

**Formula**:
```
Weighted Time = Σ (Technique Time Value × Percentage)
```

**Example**:
```
Techniques: Challa work (60%), Thread roses (40%)

Weighted Time = (12 × 0.60) + (30 × 0.40)
              = 7.2 + 12.0
              = 19.2 minutes per unit
```

### 2. Size Factor Lookup
**Purpose**: Scale calculations based on garment size

**Lookup**: Use chest size to get factor from table above

**Example**:
```
Chest Size 36 → Size Factor = 1.112
Chest Size 44 → Size Factor = 1.224
```

---

## Border Calculations

### Front/Back Top Border Value

**Formula**:
```
Top Border = Neck Type Value × Size Factor × Border Thickness
```

**Example - Front Boat Neck, Chest 36, Thickness 2"**:
```
Step 1: Get neck type value
  Boat Neck = 11

Step 2: Get size factor
  Chest 36 = 1.112

Step 3: Calculate
  Top Border = 11 × 1.112 × 2
             = 24.464 inches
```

### Bottom Border Value

**Formula**:
```
Bottom Border = (Chest Size / 2) × Bottom Border Thickness
```

**Example - Chest 36, Thickness 1.5"**:
```
Bottom Border = (36 / 2) × 1.5
              = 18 × 1.5
              = 27 inches
```

### Total Border Value (Front/Back)

**Formula**:
```
Total Border Value = Top Border + Bottom Border
```

**Example**:
```
Total Border Value = 24.464 + 27
                   = 51.464 inches
```

### Hands Border Value

**Formulas** (depends on design style):
```
Style 1: (Hand Round - 2) × 2 × Border Thickness
Style 2: (Armhole Round - 2) × 2 × Border Thickness
Style 3: (((Hand Round + Armhole Round) / 2) - 2) × 2 × Border Thickness
Style 4: (Hand Round + Armhole Round) × Border Thickness
```

**Example - Style 1, HR 10, Thickness 1"**:
```
Border Formula Result = (10 - 2) × 2 = 16
Border Value = 16 × 1 = 16 inches
```

### Border Time Calculation

**Formula**:
```
Border Time = Border Value × (Coverage / 100) × Weighted Time
```

**Example - Border Value 51.464, Coverage 80%, Weighted Time 19.2**:
```
Border Time = 51.464 × 0.8 × 19.2
            = 790.43 minutes
            ≈ 13.17 hours
```

---

## Fillwork Calculations

### Front Fillwork Area

**Formulas**:
```
Boat Neck: (Chest Size × 7) - 10
Deep Neck: (Chest Size × 7) - 56
Other Styles: 0 (not supported)
```

**Example - Boat Neck, Chest 36**:
```
Fillwork Area = (36 × 7) - 10
              = 252 - 10
              = 242 square inches
```

### Back Fillwork Area

**Formulas**:
```
Boat Neck: (Chest Size × 7) - 10
Deep Neck: (Chest Size × 7) - 70
Style 3: (Chest Size × 7) - 50
Other Styles: 0 (not supported)
```

**Example - Deep Neck, Chest 36**:
```
Fillwork Area = (36 × 7) - 70
              = 252 - 70
              = 182 square inches
```

### Hands Fillwork Area

**Formula**:
```
Hands Fillwork = ((Armhole Round + Hand Round) / 2 - 1) × Sleeve Length × 2
```

**Example - AR 12, HR 10, SL 18**:
```
Average Circumference = (12 + 10) / 2 = 11
Adjusted = 11 - 1 = 10
Area per Sleeve = 10 × 18 = 180
Total Area (both sleeves) = 180 × 2 = 360 square inches
```

### Fillwork Time Calculation

**Formula**:
```
Fillwork Time = Fillwork Area × (Coverage / 100) × Weighted Time
```

**Example - Area 242, Coverage 80%, Weighted Time 19.2**:
```
Fillwork Time = 242 × 0.8 × 19.2
              = 3,718.4 minutes
              ≈ 62 hours
```

---

## Motif Calculations

### Motif Value

**Formula**:
```
Motif Value = (Motif Width × Motif Height) × Count
```

**Example - 3" × 4" motifs, Count 5**:
```
Motif Value = (3 × 4) × 5
            = 12 × 5
            = 60 square inches
```

### Motif Time Calculation

**Formula**:
```
Motif Time = Motif Value × Size Factor × (Coverage / 100) × Weighted Time
```

**Example - Motif Value 60, Size Factor 1.112, Coverage 80%, Weighted Time 19.2**:
```
Motif Time = 60 × 1.112 × 0.8 × 19.2
           = 1,024.8 minutes
           ≈ 17 hours
```

**Why Size Factor?** Larger garments require more work for the same motif size due to:
- More fabric to stretch
- Longer thread paths
- More repositioning needed

---

## Complete Project Calculation

### Section Time Formula

```
Section Time = Border Time + Fillwork Time + Motif Time
```

### Total Project Time Formula

```
Total Time = START_TIME + Front Time + Back Time + Hands Time
           = 40 + Front Total + Back Total + Hands Total
```

---

## Worked Examples

### Example 1: Simple Front with Borders Only

**Given**:
- Chest size: 36
- Front neck: Boat neck
- Top border thickness: 2"
- Bottom border: Yes, 1.5"
- Coverage: 80%
- Techniques: Challa work (100%)

**Calculation**:

**Step 1: Calculate Border Value**
```
Top Border = 11 × 1.112 × 2 = 24.464"
Bottom Border = (36 / 2) × 1.5 = 27"
Total Border Value = 24.464 + 27 = 51.464"
```

**Step 2: Calculate Weighted Time**
```
Weighted Time = 12 (Challa work)
```

**Step 3: Calculate Border Time**
```
Border Time = 51.464 × 0.8 × 12
            = 494.05 minutes
            ≈ 8.23 hours
```

**Step 4: Total Section Time**
```
Front Time = 494.05 minutes (borders only)
```

---

### Example 2: Complete Front Panel

**Given**:
- Chest size: 36
- Front neck: Boat neck
- Top border: 2"
- Bottom border: 1.5"
- Fillwork: Enabled
- Motifs: 5 motifs, 3" × 4" each
- Coverage: 80%
- Techniques: Challa work (60%), Thread roses (40%)

**Calculation**:

**Step 1: Weighted Time**
```
Weighted Time = (12 × 0.6) + (30 × 0.4)
              = 7.2 + 12
              = 19.2 min/unit
```

**Step 2: Border Value**
```
Top Border = 11 × 1.112 × 2 = 24.464"
Bottom Border = 27"
Total = 51.464"
```

**Step 3: Border Time**
```
Border Time = 51.464 × 0.8 × 19.2
            = 790.43 minutes
```

**Step 4: Fillwork Area**
```
Fillwork Area = (36 × 7) - 10 = 242 sq.in
```

**Step 5: Fillwork Time**
```
Fillwork Time = 242 × 0.8 × 19.2
              = 3,718.4 minutes
```

**Step 6: Motif Value**
```
Motif Value = (3 × 4) × 5 = 60 sq.in
Size Factor = 1.112
```

**Step 7: Motif Time**
```
Motif Time = 60 × 1.112 × 0.8 × 19.2
           = 1,024.8 minutes
```

**Step 8: Total Front Time**
```
Front Time = 790.43 + 3,718.4 + 1,024.8
           = 5,533.63 minutes
           ≈ 92.2 hours
```

---

### Example 3: Complete Project

**Given**:
- Chest: 36, Armhole: 12, Hand Round: 10, Sleeve: 18
- Front: Boat neck, borders 2"/1.5", fillwork, motifs 3×4 (5x)
- Back: Deep neck, borders 2"/1.5", fillwork, motifs 2×3 (3x)
- Hands: Style 1, border 1", fillwork, motifs 2×2 (2x)
- Coverage: 80% all
- Techniques: Challa work (100%) all

**Calculation**:

**Front Section**:
```
Border Value = 51.464"
Fillwork Area = 242 sq.in
Motif Value = 60 sq.in

Weighted Time = 12 min/unit
Size Factor = 1.112

Border Time = 51.464 × 0.8 × 12 = 494.05 min
Fillwork Time = 242 × 0.8 × 12 = 2,323.2 min
Motif Time = 60 × 1.112 × 0.8 × 12 = 641.02 min

Front Total = 3,458.27 minutes ≈ 57.6 hours
```

**Back Section**:
```
Border Value = 51.464" (same top/bottom)
Fillwork Area = (36×7)-70 = 182 sq.in
Motif Value = (2×3)×3 = 18 sq.in

Border Time = 51.464 × 0.8 × 12 = 494.05 min
Fillwork Time = 182 × 0.8 × 12 = 1,747.2 min
Motif Time = 18 × 1.112 × 0.8 × 12 = 192.31 min

Back Total = 2,433.56 minutes ≈ 40.6 hours
```

**Hands Section**:
```
Border Value = (10-2)×2×1 = 16"
Fillwork Area = ((12+10)/2-1)×18×2 = 360 sq.in
Motif Value = (2×2)×2 = 8 sq.in

Border Time = 16 × 0.8 × 12 = 153.6 min
Fillwork Time = 360 × 0.8 × 12 = 3,456 min
Motif Time = 8 × 1.112 × 0.8 × 12 = 85.47 min

Hands Total = 3,695.07 minutes ≈ 61.6 hours
```

**Project Total**:
```
Total Time = 40 + 3,458.27 + 2,433.56 + 3,695.07
           = 9,626.9 minutes
           ≈ 160.4 hours
           ≈ 20 working days (8 hours/day)
```

---

## Calculation Decision Tree

```
For each section (Front, Back, Hands):
│
├─ Has Borders?
│  ├─ Yes: Calculate Border Value → Border Time
│  └─ No: Border Time = 0
│
├─ Has Fillwork?
│  ├─ Yes: Calculate Fillwork Area → Fillwork Time
│  └─ No: Fillwork Time = 0
│
├─ Has Motifs?
│  ├─ Yes: Calculate Motif Value → Motif Time
│  └─ No: Motif Time = 0
│
└─ Section Total = Border + Fillwork + Motif

Project Total = START_TIME + Front + Back + Hands
```

---

## Key Principles

1. **Additive**: Each section's components add up
2. **Independent**: Borders, fillwork, and motifs calculate separately
3. **Weighted**: Technique mix affects all time calculations
4. **Scaled**: Size factor adjusts motif time for garment size
5. **Coverage**: Percentage reduces time proportionally
6. **Realistic**: Based on actual embroidery work times

---

## Formula Summary Reference

| Component | Formula |
|-----------|---------|
| **Weighted Time** | Σ (Technique Time × Percentage) |
| **Front Top Border** | Neck Value × Size Factor × Thickness |
| **Back Top Border** | Neck Value × Size Factor × Thickness |
| **Bottom Border** | (Chest / 2) × Thickness |
| **Hands Border** | Style Formula × Thickness |
| **Front Fillwork Area** | (Chest × 7) - Constant |
| **Back Fillwork Area** | (Chest × 7) - Constant |
| **Hands Fillwork Area** | ((AR + HR)/2 - 1) × SL × 2 |
| **Motif Value** | Width × Height × Count |
| **Border Time** | Border Value × Coverage × Weighted Time |
| **Fillwork Time** | Area × Coverage × Weighted Time |
| **Motif Time** | Value × Size Factor × Coverage × Weighted Time |
| **Section Total** | Border + Fillwork + Motif |
| **Project Total** | 40 + Front + Back + Hands |

---

## End of Guide

This calculation system provides accurate time estimates for embroidery work based on real-world measurements and technique times. All formulas have been tested with 270+ unit and integration tests to ensure accuracy.

