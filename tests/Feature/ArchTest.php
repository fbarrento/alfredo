<?php

arch()
    ->expect(['dd', 'ray', 'dump'])
    ->not->toBeUsed();
