<?php

namespace App\Serializer;

use App\Entity\Page;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

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
            Page::class => 'json' === $format ? true : false,
        ];
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Page;
    }

    public function normalize($object, ?string $format = null, array $context = [])
    {
        $normalizedData = $this->normalizer->normalize($object, $format, $context);

        return [
            'data' => $normalizedData,
            'meta' => [],
        ];
    }
}
