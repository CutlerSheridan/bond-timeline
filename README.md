# James Bond Timeline Memory Game

## Can you remember the order of all the 007 movies?

Click on the name of each movie in chronological order and see if you can make it to the end!

For an extra challenge, check the box to include the Bond movies that weren't produced by Eon.

#### TODO NEXT

#### TODO LATER

##### Features

##### Behavior

- ? get rid of flicker upon restart as unguessedBonds is repopulated in order then shuffled
- ? reshuffle unguessed bonds after every guess

##### Style

- ? make all cards the same size
- ? add actor to guessed bonds

#### DONE

_1.0.0_

- add win/lose banner
- animate game over banner to fade in then fade out
- add gh-pages deployment information

_0.5.7_

- make best score persistent
- add Clear Best Score button

_0.5.6_

- add breakpoint for Bond card font size
- remove borders from Bond cards

_0.5.5_

- add credit
- adjust breakpoints; add a four-column middle range

_0.5.4_

- add more columns for desktop
- adjust grid gap on mobile
- style grid labels
- add instructions
- add active indication to cards for touch controls
- style control buttons
- change fonts
- restructure header

_0.5.3_

- make it so using Reveal doesn't affect score
- fix Eon toggle so both non-Eon movies are added in the correct spots

_0.5.2_

- change useEffect()s' orders so game shuffles upon first load
- remove non-Eon titles from guessedBonds if any are in there
- test adding non-Eon titles mid-game
- stop non-Eon toggle from adding 1 to score each use
- remove Eon toggle from Guessed grid

_0.5.1_

- add non-Eon toggle that repopulates unguessed with non-Eon titles and reshuffles them

_0.5.0_

- add Reveal button
- add all bond titles

_0.4.3_

- make title big
- make scores beset title

_0.4.2_

- make everything look a little nicer - rearrange things, add flexboxes, center things, change some colors
- style unguessed cards
- style guessed cards
- make underlines thinner

_0.4.1_

- make game end upon wrong answer
- add best score

_0.4.0_

- add score counter
- fix guessed Bonds retaining color in unguessed grid upon restart
  - it's not due to the useEffect() scoring logic
  - it's because, when orderedBonds was not in state, the Bond objects were getting recreated every render, so each bond.guessed got reset to false each time; now that it's in state, it retains bond.guessed as true
  - fixed by reverting all guessed bonds to guessed = false upon restart

_0.3.2_

- refactor order check logic

_0.3.1_

- display titles in grids
- make clicking any part of bond card execute guess
- make guessed cards display year

_0.3.0_

- make guessed Bonds display as proper color
- add restart button
- fix restart button so guessed bonds show back up in unguessed
  - fixed this by adding state needsShuffling and passing it as a dependency to a useEffect() instead of calling shuffleBonds() straight from the restart method as the asynchronicity was fucking it up

_0.2.0_

- add Bond card component
- add Bond grid component
- write logic to move unguessed Bond to guessed array upon click

_0.1.1_

- create Bond factory function
- create orderedBonds const
- create unguessed and guessed state objects
- write shuffleBond()

_0.1.0_

- Initial commit
