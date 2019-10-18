<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('api/users/auth', 'AuthController@login');
Route::post('api/users', 'AuthController@store');

Route::group(['middleware' => ['api.check', 'auth:api'],'prefix' => 'api'], function () {
    Route::resource('users', 'AuthController')->except(['store']);
    Route::post('users/deletelist', 'AuthController@destroyMultiple');  
});

Route::view('/{any}', 'app')
    ->where('any', '.*');
