<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'category_id';

    protected $fillable = [
         'category_desc'
    ];

    public function events()
    {
        return $this->hasMany('\Models\Event','c_id','category_id');
    }

}
