<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputOption;

class MakeService extends GeneratorCommand
{
    protected $name = 'make:service';
    protected $description = 'Create a new service class';
    protected $type = 'Service';

    protected function getStub()
    {
        $stub = $this->option('model') ? 'service.model.stub' : 'service.stub';

        return __DIR__ . '/stubs/' . $stub;
    }

    public function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace . '\Http\Services';
    }

    protected function buildClass($name)
    {
        $stub = parent::buildClass($name);

        if (! $this->option('model')) {
            return $stub;
        }

        $model = Str::studly($this->option('model'));

        return str_replace('{{ model }}', $model, $stub);
    }

    protected function getOptions()
    {
        return [
            ['model', 'm', InputOption::VALUE_REQUIRED, 'Nome do model usado pelo service'],
        ];
    }
}