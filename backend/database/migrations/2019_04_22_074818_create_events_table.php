<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('event_id')->unsigned();
            $table->string('event_title');
            $table->string('event_desc');
            $table->date('startDate');
            $table->date('endDate');
            $table->string('startTime');
            $table->string('endTime');
            $table->string('organiser');
            $table->string('venue');
            $table->integer('u_id')->unsigned();
            $table->foreign('u_id')->references('user_id')
            ->on('users')->onDelete('cascade');
            $table->integer('c_id')->unsigned();
            $table->foreign('c_id')->references('category_id')
            ->on('categories')->onDelete('cascade');
            $table->text('photo');
            $table->string('organiser_email');
            $table->string('status');
            $table->date('closing_date');
            $table->date('cancellation_date')->nullable();
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
        Schema::dropIfExists('events');
    }
}
