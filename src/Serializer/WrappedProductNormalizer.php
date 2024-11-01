<?php

namespace App\Serializer;

use App\Entity\Page;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class WrappedProductNormalizer implements NormalizerInterface
{
    private $normalizer;

    public function __construct(ObjectNormalizer $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            Page::class => $format === 'json' ? true : false,
        ];
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        return $data instanceof Page;
    }

    public function normalize($object, string $format = null, array $context = [])
    {
        $normalizedData = $this->normalizer->normalize($object, $format, $context);

        return [
            'data' => $normalizedData,
            'meta' => [],
        ];
    }
}
