<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventFeedbackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event__feedback', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('u_id')->unsigned();
            $table->foreign('u_id')->references('user_id')
            ->on('users')->onDelete('cascade');
            $table->integer('e_id')->unsigned();
            $table->foreign('e_id')->references('event_id')
            ->on('events')->onDelete('cascade');
            $table->string('feedback_msg');
            $table->integer('rating');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event__feedback');
    }
}
