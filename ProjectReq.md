Application Proposal
1. Project Vision and Topic
The project involves a complete overhaul of the "Fitting Pipes" math game. The game is now called Equation Gateway. While the original focused on balancing addition and subtraction expressions through a pipe-fitting metaphor, The redesign transforms the experience into a fast-paced decision-making game. The core objective remains related to teaching: improving mental math fluency and operational logic. However, the redesign introduces a mechanic where users must solve equations to navigate through physical barriers (doors), providing a more urgent and engaging gameplay loop.
2. Game Mechanics and User Experience (UX) Redesign
The UI will be modernized, moving away from the static pipe-balancing screen to a forward-scrolling or stage-based environment.
Main Page: A centralized hub featuring a 
"Play" button, 
"Settings" (for sound and difficulty), 
"Tutorial," 
"Stage Select."
Etc.
The Equation Gateway Mechanic: the user is presented with a central equation at the top of the screen. The user must then analyze two or more "Gateways" (which look like doors) labeled with different numerical values or sub-expressions. To progress, the user must select the correct door.
Visual Feedback: Correct choices result in a smooth transition to the next stage, while incorrect choices provide immediate haptic or visual feedback (e.g., the door shaking or the equation highlighting the error) and a time penalty.
3. Functional Scope and Features
Expanded Operations
The original game focused primarily on addition and subtraction. This redesign incorporates:
Beginner Level: Addition and Subtraction.
Advanced Level: Multiplication and Division.
Expert Level: Mixed operations and basic order of operations (PEMDAS/BODMAS).
Extreme Level: Immediately introduces division/multiplication & introduces a decreased time multiplier.
Stage-Based Progression
The game will be divided into stages:
Stage 1: Basic arithmetic based on selected difficulty, lots of time
Stage 2: Increased number size, mixing operations, with same amount of time
Stage 3: Small bump in number size, and arithmetic difficulty, however time to solve is significantly reduced.
Each stage will increase the complexity of the equations and the speed required to choose a door. The amount of time and complexity is dependent on the selected difficulty.
Improved Tutorial
The tutorial will be revamped from a static help screen to an interactive tutorial. It will guide the user through a guided walkthrough where the game pauses to explain the relationship between the equation at the top and the values on the doors. This ensures that users of all ages understand the choice-based mechanic before entering timed stages.
4. Technical Implementation
The application will be developed using Java.
Logic: The math engine will be built using robust Java logic to generate random but solvable equations based on the selected difficulty level.
UI Framework: The interface will utilize JavaFX or Swing to handle the graphical rendering of the main page, stages, and the door-choice animations.The application's core is the Java ecosystem, providing a robust, platform-independent foundation.
Testing: The application will include automated unit tests using JUnit.
