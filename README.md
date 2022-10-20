# James Bond Timeline Memory Game

## Can you remember the order of all the Bond movies?

Click on the name of each movie in chronological order and see if you can make it to the end!

#### TODO NEXT

- make game end upon wrong answer

#### TODO LATER

##### Features

- add reveal button
- add persistent best score
- ? clear best score button
- non-Eon toggle?

##### Behavior

- add win screen
- add lose screen

##### Style

- black card with gold outline, gold underline, white cursive sans-serif letters

##### Maybe

- add actor to guessed bonds

#### DONE

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
