<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
        protected $table = 'users';
        protected $primaryKey = 'user_id';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'username', 'password', 'role', 'phoneNo'
    ];
    
    public function events()
    {
        return $this->hasMany('\Models\Event','u_id','user_id');
    }

    public function event__registers()
    {
        return $this->hasMany('\Models\Event_Register','u_id','user_id');
    }

    public function event__feedback()
    {
        return $this->hasMany('\Models\Event_Feedback','u_id','user_id');
    }

        /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function generateToken()
    {
        $this->api_token = str_random(60);
        $this->save();

        return $this->api_token;
    }
}


