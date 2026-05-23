<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

$cafes = require __DIR__ . '/../routes/api.php';
$endpoint = isset($_GET['endpoint']) ? (string) $_GET['endpoint'] : 'cafes';

$normalizedCafes = array_map(static function (array $cafe): array {
    $name = (string) $cafe['name'];
    $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '', $name) ?? '');

    $cafe['googleMap'] = 'https://maps.google.com/?q=' . rawurlencode($name . ' Phnom Penh');
    $cafe['facebook'] = 'https://facebook.com/' . ($slug !== '' ? $slug : 'ppcafefinder');

    return $cafe;
}, $cafes);

if ($endpoint === 'meta') {
    $areas = array_values(array_unique(array_map(static fn(array $cafe): string => $cafe['area'], $normalizedCafes)));

    $vibes = [];
    foreach ($normalizedCafes as $cafe) {
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
$limit = max(1, min(150, (int) ($_GET['limit'] ?? 24)));

$results = array_values(array_filter(
    $normalizedCafes,
    static function (array $cafe) use ($q, $area, $vibe): bool {
        $haystack = strtolower($cafe['name'] . ' ' . $cafe['area'] . ' ' . $cafe['bestFor'] . ' ' . $cafe['address'] . ' ' . $cafe['wifi'] . ' ' . implode(' ', $cafe['vibe']));
        $matchSearch = $q === '' || str_contains($haystack, $q);
        $matchArea = $area === 'all' || $cafe['area'] === $area;
        $matchVibe = $vibe === 'all' || in_array($vibe, $cafe['vibe'], true);

        return $matchSearch && $matchArea && $matchVibe;
    }
));

echo json_encode([
    'count' => count($results),
    'cafes' => array_slice($results, 0, $limit),
], JSON_THROW_ON_ERROR);
