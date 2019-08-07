How the cipher works?

The whole concept is very simple, let's see a example: First get a set of any thing(ex. the 8 aces 
cards of two decks).
Now you'd like shuffle this cards, so you can do this of two ways: randomlly or create
a pattern for this. Let's create a pattern!
Give a name for each Aces: Ace1, Ace2, Ace3, Ace4, Ace5, Ace6, Ace7, Ace8. Imagene this cards 
in the table in a row, and follow the steps:
1: choice a number betwen 1 and 8; (4); 
   // All choiced number will represent the position of the Ace in the row (here first position is 1).
2: remove the card from the choiced position and put it in a new row and note your position;
    (Ace1, Ace2, Ace3, Ace5, Ace6, Ace7, Ace8), (4), (Ace4)
3: choice a new number betwen 1 and 7 (because now the main sequence have just 7 cards); (2);
4: change the choiced card by the card in the first position and note your position;
    (Ace2, Ace1, Ace3, Ace5, Ace6, Ace7, Ace8), (2);
    // if the choiced number was 1, just note it.
    // Back to step 1 until have half of the cards in the main row.

1: choice number (betwen 1 and 7) (2);
2: (Ace2, Ace3, Ace5, Ace6, Ace7, Ace8), (4, 2), (Ace4, Ace1)
3: choice number (betwen 1 and 6) (2);
4: (Ace3, Ace2, Ace5, Ace6, Ace7, Ace8), (2, 2)

1: choice number (betwen 1 and 6) (6);
2: (Ace3, Ace2, Ace5, Ace6, Ace7), (4, 2, 6), (Ace4, Ace1, Ace8)
3: choice number (betwen 1 and 5) (4);
4: (Ace6, Ace2, Ace5, Ace3, Ace7), (2, 2, 4)

1: choice number (betwen 1 and 5) (1);
2: (Ace2, Ace5, Ace3, Ace7), (4, 2, 6, 1), (Ace4, Ace1, Ace8, Ace6)
3: choice number (betwen 1 and 4) (3);
4: (Ace3, Ace5, Ace2, Ace7), (2, 2, 4, 3);

Now put all Aces together follow the sequence you have in the last step 2 and 4: 
    (Ace3, Ace5, Ace2, Ace7, Ace4, Ace1, Ace8, Ace6); Shuffle! ;)
    // Try for example start the process with this new sequence and before ask for a friend find out it



How to discover the initial sequence?

First you need the actual sequence: 
    (Ace3, Ace5, Ace2, Ace7, Ace4, Ace1, Ace8, Ace6)
Second, know the numbers of the removed and changed positions: 
    (4, 2, 6, 1) - Removed!
    (2, 2, 4, 3) - Changed!

Start by split the new sequence in two, to get the same lists you had in the last step 2 and 4:
    Part 1 - (Ace3, Ace5, Ace2, Ace7)
    Part 2 - (Ace4, Ace1, Ace8, Ace6)
    // Now you have two lists

Now you are ready to discover the sequence! ;)

Follow the steps: 

1: get the last value in the list of changed positions; (3)
2: use the list Part 1 and change the card in the position by the first;
    (Ace2, Ace5, Ace3, Ace7)
3: get the last value in the list of removed positions; (1)
4: get the last Ace of Part 2 (Ace6) and insert it in the correlateded position inside list Part 1:
    (Ace6, Ace2, Ace5, Ace3, Ace7)
    // Back to step 1, and continue use the values from the last to first. From the positions notes 
    // and the Prt 2 list

1: (4)
2: (Ace3, Ace2, Ace5, Ace6, Ace7)
3: (6), (Ace8)
4: (Ace3, Ace2, Ace5, Ace6, Ace7, Ace8)

1: (2)
2: (Ace2, Ace3, Ace5, Ace6, Ace7, Ace8)
3: (2), (Ace1)
4: (Ace2, Ace1, Ace3, Ace5, Ace6, Ace7, Ace8)

1: (2)
2: (Ace1, Ace2, Ace3, Ace5, Ace6, Ace7, Ace8)
3: (4), (Ace4)
4: (Ace1, Ace2, Ace3, Ace4, Ace5, Ace6, Ace7, Ace8); Done :)

Some notes:
- You can do the process with other amount of items;
- You can use a even number insted a odd;
- You can do the process until be possible remove and change the values or util you went;
- If you pretends have diferents sizes for Part 1 and Part 2 you need keep this in mind when do the
    reverse process;

I hope you get the basic idea. (:

The BreakMe use a set of 24 binaries (24bits) data to cipher a simple text.
Each group of 24bits is cipher with a diferent key.
The ciphered text is encode to Base64. Enter with a Base64 text do be decipher.