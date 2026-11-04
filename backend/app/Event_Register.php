<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event_Register extends Model
{
    
    public function users()
    {
        return $this->belongsTo('\Models\User','userId','id');
    }
    
    public function events()
    {
        return $this->belongsTo('\Models\Event','e_id','event_id');
    }
}
