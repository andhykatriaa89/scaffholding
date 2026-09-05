<?php

namespace App\Console\Commands;

use Illuminate\Foundation\Console\ServeCommand as BaseServeCommand;
use Symfony\Component\Process\Process;

class ServeCommand extends BaseServeCommand
{
    protected $description = "Serve the application on the PHP development server and start React frontend";

    public function handle()
    {
        $this->info("Starting Laravel (port 8000) and React (port 3000) concurrently...");

        $server = base_path("vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php");
        $host = $this->option("host") ?: "127.0.0.1";
        $port = $this->option("port") ?: (env("SERVER_PORT") ?: "8000");
        
        $phpServerCommand = sprintf(
            "cd %s && %s -S %s:%s %s",
            escapeshellarg(public_path()),
            PHP_BINARY,
            $host,
            $port,
            escapeshellarg($server)
        );
        
        $command = sprintf(
            "npx concurrently -c \"blue,green\" -n \"LARAVEL,REACT\" \"%s\" \"cd %s && npm start\"",
            $phpServerCommand,
            escapeshellarg(base_path("frontend"))
        );

        $process = Process::fromShellCommandline($command, base_path());
        $process->setTty(Process::isTtySupported());
        $process->setTimeout(null);
        
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        return $process->getExitCode();
    }
}
