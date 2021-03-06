# stegcom


<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>


This is a general purpose application built using `laravel 8` and `Vue js`. You can use this app as a starter template for building your applications by followiing the installation procedures outlined below.
We have integrated some of the most useful packages to ease you with the struggle of configurations

 ## Here are some awesome things the repo include out of the box:...
  * Vue Router with Laravel
  * AdminLTE 3 for admin dashboard
  * Font Awesome 5 for Laravel 8
  * Mailchimp integration
  * Laravel Socialite
  * Login Using Social Media Account
  * Laravel Api
  * Api Auth with Laravel Passport
  * JWT with Laravel Passport and JavaScript Request
  * Vue Custom Events
  * Vue form with Laravel
  * Relational Database with Laravel
  * Axios and Ajax Request
  * ACL using Vue
  * Online Users list
  * More features coming soon ...

## Installation...

It's just like any other Laravel project. Basically here is how you use it for yourself.
* Clone the repo `git clone https://github.com/Gichunga/stegcom.git`
* cd into the project folder
* run `composer install` to install the php dependencies - composer install reads composer.json and installs any dependency contanined therein
* run `npm install` to install all the javascript dependencies - npm install reads package.json file
* create a database for your application
* `ctr+shift+s` on the env.example and rename to .env then set your database information eg,

    ```php
        DB_CONNECTION= mysql
        DB_HOST= 127.0.0.1
        DB_PORT= 3306
        DB_DATABASE= <db name>
        DB_USERNAME= <your db username>
        DB_PASSWORD= <password if any>
     ```
* run `php artisan key:generate` to migrate your database
* register as a normal user then in your localhost dashboard change the user type to admin
* run `php artisan passport:install` to install the necessary confiigurations you need for your laravel passport.
* `php artisan serve` to start the application and you are good to go. ??????
* Done!!! Enjoy customizing the application to your needs and happy Coding! ????

