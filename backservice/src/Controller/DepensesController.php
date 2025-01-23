<?php

namespace App\Controller;

use App\Entity\Depenses;
use App\Repository\DepensesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/depenses')]
final class DepensesController extends AbstractController
{
    #[Route('/', name: 'get_all_depenses', methods: ['GET'])]
    public function index(DepensesRepository $depensesRepository): JsonResponse
    {
        $depenses = $depensesRepository->findAll();

        $data = array_map(function ($depense) {
            return [
                'id' => $depense->getId(),
                'montant' => $depense->getMontant(),
                'date' => $depense->getDate()->format('Y-m-d H:i:s'),
                'description' => $depense->getDescription(),
                'categorie' => $depense->getCategorie() ? $depense->getCategorie()->getNom() : null,
            ];
        }, $depenses);

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/', name: 'add_depense', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $depense = new Depenses();
        $depense->setMontant($data['montant']);
        $depense->setDate(new \DateTime($data['date']));
        $depense->setDescription($data['description']);
        // Ajouter ici la logique pour lier la catégorie si nécessaire

        $entityManager->persist($depense);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Dépense ajoutée'], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'edit_depense', methods: ['PUT'])]
    public function edit(int $id, Request $request, DepensesRepository $depensesRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $depense = $depensesRepository->find($id);
        if (!$depense) {
            return new JsonResponse(['error' => 'Dépense non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $depense->setMontant($data['montant'] ?? $depense->getMontant());
        $depense->setDate(new \DateTime($data['date'] ?? $depense->getDate()->format('Y-m-d H:i:s')));
        $depense->setDescription($data['description'] ?? $depense->getDescription());

        $entityManager->flush();

        return new JsonResponse(['status' => 'Dépense mise à jour'], Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'delete_depense', methods: ['DELETE'])]
    public function delete(int $id, DepensesRepository $depensesRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $depense = $depensesRepository->find($id);
        if (!$depense) {
            return new JsonResponse(['error' => 'Dépense non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($depense);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Dépense supprimée'], Response::HTTP_OK);
    }
}