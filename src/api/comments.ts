const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export type Comment = {
    id: string;
    userId: string;
    username: string;
    displayName: string;
    content: string;
    rating: number;
    category: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateCommentRequest = {
    content: string;
    rating: number;
    category: string;
};

export type UpdateCommentRequest = {
    content: string;
    rating: number;
    category: string;
};

export type PagedResponse<T> = {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
};

export type CommentStatistics = {
    averageRating: number;
    totalComments: number;
    uniqueUsers: number;
    satisfiedPercentage: number;
};

/**
 * Get all comments with pagination
 */
export async function getComments(page: number = 0, size: number = 10): Promise<PagedResponse<Comment>> {
    const response = await fetch(`${API_BASE_URL}/api/comments?page=${page}&size=${size}`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();
}

/**
 * Get comments for a specific user
 */
export async function getMyComments(
    userId: string,
    page: number = 0,
    size: number = 10
): Promise<PagedResponse<Comment>> {
    const response = await fetch(`${API_BASE_URL}/api/comments/my-comments?userId=${userId}&page=${page}&size=${size}`);
    if (!response.ok) {
        throw new Error('Failed to fetch my comments');
    }
    return response.json();
}

/**
 * Get comment statistics
 */
export async function getCommentStatistics(): Promise<CommentStatistics> {
    const response = await fetch(`${API_BASE_URL}/api/comments/statistics`);
    if (!response.ok) {
        throw new Error('Failed to fetch comment statistics');
    }
    return response.json();
}

/**
 * Create a new comment
 */
export async function createComment(
    userId: string,
    request: CreateCommentRequest
): Promise<Comment> {
    const response = await fetch(`${API_BASE_URL}/api/comments?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to create comment');
    }

    return response.json();
}

/**
 * Update a comment (only if you're the owner)
 */
export async function updateComment(
    commentId: string,
    userId: string,
    request: UpdateCommentRequest
): Promise<Comment> {
    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}?userId=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update comment');
    }

    return response.json();
}

/**
 * Delete a comment (only if you're the owner)
 */
export async function deleteComment(commentId: string, userId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}?userId=${userId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to delete comment');
    }
}

