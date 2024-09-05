import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages }) => {
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams) 
        params.set('page', page.toString())
        return `/search?${params.toString()}`
    }

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) {
                pages.push('...');
            }
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <Pagination className="w-full justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        href={handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
                {generatePageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink 
                                href={handlePageChange(page as number)} 
                                isActive={page === currentPage}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext 
                        href={handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}