<?php

use Illuminate\Http\Request;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('users', 'UserController@index');
Route::get('users/{user_id}', 'UserController@show');
Route::post('users', 'UserController@store');
Route::put('users/{user_id}', 'UserController@update');
Route::delete('users/{user_id}', 'UserController@delete');

Route::get('events', 'EventController@index');
Route::get('events/{event_id}', 'EventController@show');
Route::post('events', 'EventController@store');
Route::put('events/{event_id}', 'EventController@update');
Route::delete('events/event_id}', 'EventController@delete');

Route::get('categories', 'CategoryController@index');
Route::get('categories/{category_id}', 'CategoryController@show');
Route::post('categories', 'CategoryController@store');
Route::put('categories/{category_id}', 'CategoryController@update');
Route::delete('categories/{category_id}', 'CategoryController@delete');

Route::get('event__feedback', 'FeedbackController@index');
Route::get('event__feedback/{id}', 'FeedbackController@show');
Route::post('event__feedback', 'FeedbackController@store');
Route::put('event__feedback/{id}', 'FeedbackController@update');
Route::delete('event__feedback/{id}', 'FeedbackController@delete');

Route::get('event__registers', 'EventRegisterController@index');
Route::get('event__registers/{id}', 'EventRegisterController@show');
Route::post('event__registers', 'EventRegisterController@store');
Route::put('event__registers/{id}', 'EventRegisterController@update');
Route::delete('event__registers/{id}', 'EventRegisterController@delete');
Route::middleware('auth:api')
    ->get('/users', function (Request $request) {
        return $request->user();           
    });
Auth::guard('api')->user(); // instance of the logged user
Auth::guard('api')->check(); // if a user is authenticated
Auth::guard('api')->id(); // the id of the authenticated user

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
// Route::group(['middleware' => 'auth:api'], function() {

//     Route::get('users', 'UserController@index');
//     Route::get('users/{user_id}', 'UserController@show');
//     Route::post('users', 'UserController@store');
//     Route::put('users/{user_id}', 'UserController@update');
//     Route::delete('users/{user_id}', 'UserController@delete');
    
//     Route::get('events', 'EventController@index');
//     Route::get('events/{event_id}', 'EventController@show');
//     Route::post('events', 'EventController@store');
//     Route::put('events/{event_id}', 'EventController@update');
//     Route::delete('events/event_id}', 'EventController@delete');
    
//     Route::get('categories', 'CategoryController@index');
//     Route::get('categories/{category_id}', 'CategoryController@show');
//     Route::post('categories', 'CategoryController@store');
//     Route::put('categories/{category_id}', 'CategoryController@update');
//     Route::delete('categories/{category_id}', 'CategoryController@delete');
    
//     Route::get('event__feedback', 'FeedbackController@index');
//     Route::get('event__feedback/{id}', 'FeedbackController@show');
//     Route::post('event__feedback', 'FeedbackController@store');
//     Route::put('event__feedback/{id}', 'FeedbackController@update');
//     Route::delete('event__feedback/{id}', 'FeedbackController@delete');
    
//     Route::get('event__registers', 'EventRegisterController@index');
//     Route::get('event__registers/{id}', 'EventRegisterController@show');
//     Route::post('event__registers', 'EventRegisterController@store');
//     Route::put('event__registers/{id}', 'EventRegisterController@update');
//     Route::delete('event__registers/{id}', 'EventRegisterController@delete');
// });


