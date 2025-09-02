<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BenefitController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\FooterController;

Route::apiResource('/services', ServiceController::class);
Route::apiResource('/benefits', BenefitController::class);
Route::apiResource('/testimonials', TestimonialController::class);
Route::apiResource('/profiles', ProfileController::class);
Route::apiResource('/footers', FooterController::class);


