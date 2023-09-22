# Back-end side

Make backend with `Django REST framework`

## Setup Vending Machine

1. Run project with **Docker compose**
   > If `vending_machine-web` error cannot connect to database
   >
   > Please restart `vending_machine-web`
   >
   > Due to database(`vending_machine-db`) start slower than `vending_machine-web`
2. Login to Admin(CMS)

    Access to CMS with [http://localhost:8989/admin](http://localhost:8989/admin/) default username and password is

    ```sh
    username: admin
    password: qwer1234
    ```

3. Create new `Vending Machine` in menu [Vending Machines](http://localhost:8989/admin/machine/vendingmachine/)
4. Create new `Product` in menu [Products](http://localhost:8989/admin/stock/product/)
5. Add item to `Vending Machine` in menu [Items in machines](http://localhost:8989/admin/stock/itemsinmachine/)
6. Now you can acess to to `Front-end side` with [http://localhost:8000/](http://localhost:8000) and select `Vending Machine` you want.

## API doc

1. [Swagger](http://localhost:8989/api/schema/swagger/) `http://localhost:8989/api/schema/swagger/`
2. [Redoc](http://localhost:8989/api/schema/redoc/) `http://localhost:8989/api/schema/redoc/`

## Note (idea) 🤔

1. Max slot for each machine
2. Store slot number in `ItemsInMachine` model
3. Refund money
