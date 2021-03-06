# BAMAZON CUSTOMER VERSION

<p>This week's homework assignment was to create a CLI app using JavaScript, Node and MySQL. The concept of this app is similar to an online store.
The completed app should ask the user upon connecting to the database, what action thay would like to do. If the user chooses to exit, the connection to the database will end. If the user chose to browse items, they will be displayed a list of items along with their basic info (item ID, product name, the price, quantity in stock).
The user is then asked to enter the 'item ID' of the product they wish to purchase. They will then be asked to enter how much of the product they wish to purchase. I added extra logic where the user can exit out of this prompt, should they change their mind or made a mistake.
If there is enough of the product in stock to meet the users request, it will display the total cost of their order and update the database accordingly.</p>

## CHALLENGES

* Working with databases and handling how the data is returned and shared.
* Adding enough logic so the user is never really 'trapped'

<hr>

### INITIAL PROMPT UPON CONNECTING SUCCESSFULLY TO THE DATABASE
![initial user ask prompt](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/askUser-pic.png)

<hr>

### DISPLAYS THE LIST OF ITEMS ALONG WITH THEIR INFO
![items and their info](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/showItems-pic.png)

<hr>

### DISPLAYS THE TOTAL COST OF THE PURCHASE
![valid purchase and total cost of the purchase](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/validPurchase-pic.png)

<hr>

### SHOWS THE UPDATED STOCK QUANTITY AFTER THE PURCHASE
![updated stock quantity after purchase](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/updatedStock-pic.png)

<hr>

### IF THERE ISN'T ENOUGH OF THE PRODUCT IN STOCK
![display message not enough items in stock](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/notEnough-pic.png)
