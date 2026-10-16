
# Sproutly: Stitch prompts

How to use: paste the master prompt first to generate the Today screen. Then paste each screen prompt one at a time in the same project, so Stitch keeps the same style.

---

## 1. Master prompt (paste first)

Design a mobile app called Sproutly for home gardeners who grow plants, vegetables and herbs on terraces, balconies and windowsills. Users are hobbyists of all ages, often standing outside in bright sun with soil on their hands. The app helps them know what to do today: water, feed, harvest. It also maps where each pot sits and how much sun it gets, and diagnoses sick plants from a photo.

Visual direction: "kitchen garden in full sun". It should feel lively, sunlit and hands-on, not like a spa, a wellness app, or a generic plant shop.

Color palette (use exactly these):
- Rainwash #F7F9F4: app background, a cool off-white with a hint of green
- Aubergine #2E1A2B: all primary text and icons, used instead of black
- Chlorophyll #2F7D3A: primary buttons, active states, healthy plants
- Seedling #DDEFC9: soft fills, selected chips, the sunny zones on the terrace map
- Pollen #F4C430: sun-hours indicators and harvest-ready badges. Use it sparingly.
- Tomato #E2462F: only for urgent states (thirsty, pest found, overdue)

Typography:
- Headlines: Bricolage Grotesque, bold, tight letter spacing. Large and confident, like hand-painted seed-packet lettering.
- Body and UI: Atkinson Hyperlegible, 16px minimum. It was chosen so text stays readable outdoors in glare.
- Sentence case everywhere. No all-caps labels, no small uppercase eyebrow text above headings.

Layout and shapes:
- Left-aligned content, 20px side margins, generous vertical spacing.
- Corner radius follows hierarchy: large 28px for the main hero surface on each screen, 16px for list rows and cards, fully rounded pills for chips and buttons. Do not round everything the same.
- Use flat color fills instead of drop shadows. No gradients.
- Plant images are real photos of potted plants on terraces and balconies, cropped as soft rounded squares.
- Icons: rounded, 2px stroke line icons in Aubergine.
- Big touch targets of at least 48px. The main action sits within thumb reach in the lower half.
- Bottom navigation has 4 tabs: Today, My garden, Plant doctor, Grow guide. Use icon plus label. The active tab gets a Seedling pill behind its icon.

Signature element: the terrace map. It's a top-down, slightly illustrated grid of the user's actual space, with a compass marker and pots drawn as small circles with plant photos inside. Sunny zones are shaded in Seedling, and the brightest spots get a Pollen glow. This is the one bold, memorable visual. Keep everything around it calm and disciplined.

Copy tone: plain, warm, practical. Write buttons as the exact action, e.g. "Water now", "Log harvest", "Add plant". No arrows after button text, and no middle-dot separators.

Generate the first screen, Today:
- A greeting with today's weather for the garden: "Good morning, Saif", then "32°C, clear. Water before 10 am."
- A hero card (28px radius, Chlorophyll background, Rainwash text) that says "4 plants need water" and has a "Water now" button and small round plant photos.
- A "Today's jobs" list with checkable rows: "Feed the tomatoes (liquid seaweed)", "Pinch basil tips", "Harvest 6 chillies". Each row has a plant thumbnail and a timing such as "Morning".
- A compact preview of the terrace map titled "Your terrace", with a "Open map" link.
- A small tip card: "Monsoon is 3 weeks away. Raise pots off the floor to stop waterlogging."
- Bottom navigation with Today active.

---

## 2. Screen prompts (paste one at a time after the master)

### Onboarding: set up your space
Using the same Sproutly style, design a 3-step onboarding flow as three screens, with a step indicator at the top (step 1 of 3).
- Step 1, "Where do you grow?": three large selectable tiles with illustrations: Terrace, Balcony, Windowsill. Plus a smaller "Indoor shelf" option. The selected tile gets a Seedling fill and a Chlorophyll border.
- Step 2, "Which way does it face?": a large draggable compass dial and a hint: "Stand in your space and point your phone outward." Show a live readout: "South-west, about 6 hours of sun."
- Step 3, "What are you growing?": a search bar and a grid of plant chips with small photos (Tomato, Chilli, Mint, Money plant, Hibiscus, Curry leaf, Spinach, Rose). Selected chips show a check. The primary button says "Build my garden".

### My garden: terrace map
Using the same Sproutly style, design the My garden screen, centered on the terrace map.
- Top: the title "My garden" and a segmented toggle, Map / List.
- The map fills most of the screen. It's a top-down grid of a 12 × 8 ft terrace with a parapet wall edge, a compass rose in the corner, and sun zones shaded Seedling and Pollen by sun hours. 14 pots appear as circles with plant photos. One pot has a Tomato ring meaning thirsty.
- A small floating legend shows sun hours: 2–4h, 4–6h, 6h+.
- When a pot is tapped, a bottom sheet opens: "Cherry tomato, 42 days old", "6h sun, good spot", and buttons "Water now" and "Open plant".
- A floating "Add plant" button in Chlorophyll.
- Bottom navigation with My garden active.

### Plant detail
Using the same Sproutly style, design a plant detail screen for "Cherry tomato".
- Hero: a large rounded photo (28px radius) of a tomato plant in a grow bag, with the name in Bricolage Grotesque, the nickname "Balcony corner", and the age "Day 42 of ~75".
- A growth timeline as a horizontal stepped track: Seedling, Vegetative, Flowering (current), Fruiting, Harvest. The current stage is highlighted in Chlorophyll.
- A care row of three tiles: Water (every 2 days, next: today), Feed (every 14 days, next: in 3 days), Sun (6h, ideal).
- "Recent notes": a photo journal strip with dated thumbnails and short notes such as "First flowers!"
- Actions at the bottom: "Water now" (primary) and "Add photo" (secondary outline).

### Add plant: identify by photo
Using the same Sproutly style, design a 2-screen add-plant flow.
- Screen A: a full-screen camera view with a rounded square framing guide and the hint "Fit one leaf in the frame". Below it, a shutter button, a "Choose from gallery" option, and a "Search by name" option.
- Screen B, the result: a photo at the top and the match "Holy basil (Tulsi)", 94% match, with two other possible matches as smaller rows. Below that, "Where will it live?" with a mini terrace map to tap a spot. Then a quick care summary and the primary button "Add to my garden".

### Plant doctor
Using the same Sproutly style, design the Plant doctor tab with a diagnosis result.
- Top: "Plant doctor", a large camera button card saying "Photograph the problem leaf", and a row of recent checks.
- The result screen: the leaf photo with circular markers on the affected spots. The diagnosis "Aphids (likely)" sits in a Tomato-tinted badge, with a confidence level and severity "Early, easy to fix".
- "What to do" as a numbered sequence (this is an ordered treatment, so numbering is fine): 1. Spray with water to knock them off. 2. Apply neem oil spray in the evening. 3. Check again in 3 days.
- A "Remind me in 3 days" button and an option "Ask the community".
- Bottom navigation with Plant doctor active.

### Grow guide: what to sow now
Using the same Sproutly style, design the Grow guide tab.
- Title "Grow guide", then a hero card: "Sow this month: October", with a horizontal carousel of plant cards (Spinach, Coriander, Carrot, Marigold). Each card shows a photo, "Ready in 40 days", and a sun need icon.
- Filter chips: Vegetables, Herbs, Flowers, Easy for beginners, Grows in shade.
- A list of guides with thumbnails: "Grow chillies in a 12-inch pot", "Make compost in a bucket", "Self-watering bottles for holidays". Each shows read time.
- Bottom navigation with Grow guide active.

### Care calendar
Using the same Sproutly style, design a care calendar screen.
- A week strip at the top with day pills. Days with jobs show small colored dots: Chlorophyll for water, Pollen for harvest, Tomato for overdue.
- Below that, the selected day's jobs grouped by Morning and Evening. Each row has a plant thumbnail, the job, and a check circle.
- A weather banner: "Rain expected Thursday. Watering skipped for 9 plants."
- A floating button: "Add reminder".

### Harvest log
Using the same Sproutly style, design a Harvest log screen that celebrates what the user grew.
- Hero: a big number set in Bricolage Grotesque: "3.2 kg harvested this season", with a short line below: "That's about 18 salads."
- A simple bar chart of monthly harvest in Chlorophyll, with the current month in Pollen.
- A list of harvest entries with photos: "Chillies, 140 g, 12 Oct", "Mint, 1 bunch, 10 Oct".
- The primary button "Log harvest" opens a bottom sheet with a plant picker, a weight or count stepper, and an optional photo.

### Empty and error states
Using the same Sproutly style, design 2 states.
- An empty My garden: a light line illustration of an empty terrace grid with one pot outline, the text "Your terrace is empty. Add your first plant and we'll work out its sun and water.", and the button "Add plant".
- A Plant doctor photo error: "We couldn't see the leaf clearly. Move closer and make sure it's in daylight." with the button "Retake photo". No apologies, just direction.

---

## 3. Iteration prompts (if Stitch drifts)

- "Remove all drop shadows and gradients; use flat Seedling and Rainwash fills."
- "Replace any black text with Aubergine #2E1A2B."
- "Headings are too small: increase to 32px Bricolage Grotesque bold with tight tracking."
- "Remove uppercase labels and eyebrow text above headings; use sentence case."
- "Too many cards look identical: make the hero surface larger with 28px radius and keep list rows flatter."
- "Use Tomato red only for urgent states; recolor anything else."
