<?php

namespace App\Serializer;

use App\Entity\Page;
use App\Enum\Route\Api\Back;
use App\Enum\Route\Web\Front;
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
                Front::PAGE_UPDATE => $this->urlGenerator->generate(Back::PAGE_UPDATE, ['id' => $object->getId()]),
                Front::PAGE_SHOW => $this->urlGenerator->generate(Back::PAGE_SHOW, ['id' => $object->getId()]),
            ],
            'meta' => new stdClass,
        ];
    }
}
