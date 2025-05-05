<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tiket', function (Blueprint $table) {
            $table->integer('id_tiket', true);
            $table->string('id_user', 45);
            $table->string('id_studio', 45);
            $table->string('id_kursi', 45);
            $table->string('id_film', 45);
            $table->string('id_jadwal', 45);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiket');
    }
};
