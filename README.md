Senior JavaScript Developer Tech Interview 2
=================

STEP 1: **Guess a number between 1 and 2000.**
------------

The URL https://okc-interview.glitch.me/ will accept a POST param called `number`. Its response will be a `status` of `"low"`, `"high"`, `"correct"`, or `"out of bounds"`. Based on those responses, your task is figuring out what number the server is thinking of. You're more than welcome to use Stack Overflow/the internet and the AJAX library of your choice.

STEP 2: **Mystery phrase.**
------------

Once you've guessed the correct number, the payload will also include a property called `nextNumber`. The number will be higher than 2000, but if it's "guessed" using the format from step 1, it will return an object with both `letter` and `nextNumber` properties. By assembling the `letter`s over the course of guessing each `nextNumber`, you'll put together a sentence, which is the solution to the puzzle. (The final `letter` will not have a `nextNumber` included.)