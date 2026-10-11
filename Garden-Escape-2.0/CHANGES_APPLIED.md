# Garden Escape update

## Changes in this package
- Increased the density of the authoritative 25x25 hedge maze by adding 22 extra hedge cells while keeping all team starts, key locations, central finish and gate/checkpoint locations connected.
- Added the 60 binary-coded statements from `Game.docx` to the question bank. Each new question displays the encoded prompt and offers the statement wordings as choices; questions are assigned across the four teams.
- Added five lives per team, shown as heart icons in the player view. A wrong answer removes one heart. When a team's lives reach zero, that team is marked finished/eliminated.
- Wrong answers rotate to a different question for that team. The missed question is removed from the asked list so it can appear again later, rather than immediately repeating.

## Notes
- The existing game already contains four central gates and four corner keys. The new binary questions are part of the same question cycle, so they can be answered during gameplay. This update does not introduce a separate per-team three-block UI or a separate gate-only quiz screen.
- Accounts/rooms remain in-memory as in the original prototype; restarting the server clears active rooms.


## Quiz blocks per team (October 2026)
- Replaced the four shared key gates with 12 quiz blocks: three each for HR, Marketing, Finance, and Operations.
- Placed the blocks on open corridor cells along each team's outer approach to the central garden.
- Quiz blocks display a prompt that a correct quiz answer is needed to unlock them. Since movement is only enabled after a correct answer, entering a block cell unlocks that block for the current team.
- Kept unlock state team-specific so another team's progress does not open a block for everyone.


## Garden Escape maze and quiz update (2026-10-10)
- Replaced the small maze grid with a 31x31 procedurally generated hedge labyrinth, including additional loops and alternate paths inspired by the reference garden maze.
- Moved the 12 team quiz blocks to non-linear positions along winding routes (3 per current team).
- Kept the 30-minute race timer and five-life system; lives are now displayed in the top HUD during the race.
- Question sequence is now 1-4 normal, 5 binary, 6-9 normal, 10 binary, repeating every fifth question. Wrong answers do not advance the sequence and still cost one life.
- Current source still defines four teams: HR, Marketing, Finance, Operations.


## Two-level progression update
- Added Level 1 Business Logic & Data Reasoning challenge with 15 authored questions.
- Added 20-minute timer, five lives, binary checkpoints at questions 5/10/15, and three unlockable blocks.
- Player login flow now requires Level 1 completion before joining the existing Level 2 maze. Admin and projector login remain unchanged.
- Labeled the existing multiplayer maze as Level 2. No Level 3 was added.

## Admin control completion (2026-10-11)
- Added a per-room shared admin key inventory starting at 50; admin key awards deduct from the pool, and reset replenishes it to 50.
- Added Level 3 admin movement controls for each team. The server validates integer coordinates, maze bounds, and traversability before moving a player.
- When a team attempts to enter a locked gate without enough keys, the server creates a team-specific pending block request and broadcasts it to the admin dashboard.
- Admin can approve an individual team's pending gate request; one key is deducted from the shared inventory, credited to that team, and that team's specific gate is unlocked. Other teams' gates remain locked.
- The existing admin Reset Match action resets the authoritative shared room state and the key inventory.
- Validation limitation: dependency installation did not finish in this environment, so TypeScript/build tests could not be completed here. Run `npm install --legacy-peer-deps` and `npm run lint` locally.
