<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

$cafes = require __DIR__ . '/../routes/api.php';
$endpoint = isset($_GET['endpoint']) ? (string) $_GET['endpoint'] : 'cafes';

if ($endpoint === 'meta') {
    $areas = array_values(array_unique(array_map(static fn(array $cafe): string => $cafe['area'], $cafes)));

    $vibes = [];
    foreach ($cafes as $cafe) {
        foreach ($cafe['vibe'] as $vibe) {
            if (!in_array($vibe, $vibes, true)) {
                $vibes[] = $vibe;
            }
        }
    }

    echo json_encode(['areas' => $areas, 'vibes' => $vibes], JSON_THROW_ON_ERROR);
    exit;
}

$q = strtolower(trim((string) ($_GET['q'] ?? '')));
$area = (string) ($_GET['area'] ?? 'all');
$vibe = (string) ($_GET['vibe'] ?? 'all');

$results = array_values(array_filter(
    $cafes,
    static function (array $cafe) use ($q, $area, $vibe): bool {
        $haystack = strtolower($cafe['name'] . ' ' . $cafe['area'] . ' ' . $cafe['bestFor'] . ' ' . implode(' ', $cafe['vibe']));
        $matchSearch = $q === '' || str_contains($haystack, $q);
        $matchArea = $area === 'all' || $cafe['area'] === $area;
        $matchVibe = $vibe === 'all' || in_array($vibe, $cafe['vibe'], true);

        return $matchSearch && $matchArea && $matchVibe;
    }
));

echo json_encode(['count' => count($results), 'cafes' => $results], JSON_THROW_ON_ERROR);
