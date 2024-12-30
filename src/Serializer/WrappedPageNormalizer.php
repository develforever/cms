<?php

namespace App\Serializer;

use App\Entity\Page;
use App\Enum\Route\Api\Back;
use stdClass;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class WrappedPageNormalizer implements NormalizerInterface
{

    public function __construct(private ObjectNormalizer $normalizer, private UrlGeneratorInterface $urlGenerator) {}

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
            'links' => [
                'page_update' => $this->urlGenerator->generate(Back::UPDATE, ['id' => $object->getId()]),
                'page_show' => $this->urlGenerator->generate(Back::SHOW, ['id' => $object->getId()]),
            ],
            'meta' => new stdClass,
        ];
    }
}
