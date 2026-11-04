<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
 
    protected $primaryKey = 'event_id';
    protected $fillable = [
        'event_title', 'event_desc', 'startDate', 'endDate', 'startTime'
        , 'endTime', 'organiser', 'venue', 'u_id', 'c_id', 'photo' 
        , 'organiser_email', 'status', 'closing_date'
   ];
    public function users()
    {
        return $this->belongsTo('\Models\User','userId','id');
    }

    public function categories()
    {
        return $this->belongsTo('\Models\Category','c_id','category_id');
    }

    public function event__registers()
    {
        return $this->hasMany('\Models\Event_Register','e_id','event_id');
    }

    public function event__feedback()
    {
        return $this->hasMany('\Models\Event_Feedback','e_id','event_id');
    }
}
