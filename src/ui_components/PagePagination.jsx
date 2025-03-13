import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PagePagination = ({ numOfPages, handleSetPage, page }) => {

  const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1]; // Fix: Get last number properly

  return (
    <Pagination className="my-6 dark:text-white">
      <PaginationContent>

        {/* Show Previous Button Only If Not on First Page */}
        {page !== firstNumber && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => handleSetPage(page - 1)} />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {numbers.map(num => (
          <PaginationItem key={num} onClick={() => handleSetPage(num)}>
            {num === page ? (
              <PaginationLink href="#" isActive>{num}</PaginationLink>
            ) : (
              <PaginationLink href="#">{num}</PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Show Next Button Only If Not on Last Page */}
        {page !== lastNumber && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => handleSetPage(page + 1)} />
          </PaginationItem>
        )}

      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
