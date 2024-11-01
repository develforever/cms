<?php

namespace App\Repository;

use App\Entity\Page;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Page>
 */
class PageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Page::class);
    }

    /**
     * Undocumented function
     *
     * @param integer $page
     * @param integer $limit
     * @return array<string, mixed>
     */
    public function findPaginated(int $page = 1, int $limit = 10): array
    {
        $queryBuilder = $this->createQueryBuilder('p')
            ->orderBy('p.id', 'ASC')
            ->setFirstResult(($page - 1) * $limit) // Ustaw początek wyników
            ->setMaxResults($limit); // Ustaw ilość wyników na stronie

        // Zwracamy wyniki oraz całkowitą liczbę elementów dla paginacji
        $results = $queryBuilder->getQuery()->getResult();

        return [
            'result' => $results,
            'total' => $this->count([]), // Całkowita liczba elementów bez paginacji
        ];
    }

    //    /**
    //     * @return Page[] Returns an array of Page objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Page
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
