import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock Supabase API calls
  http.get('*/rest/v1/cursos*', () => {
    return HttpResponse.json([
      {
        slug: 'test-course',
        titulo: 'Test Course',
        descricao: 'Test Description',
        instrutor: 'Test Instructor',
        duracao_estimada: '2 hours',
        nivel: 'Iniciante',
        status: 'ativo',
        preco: 99.90,
        moeda: 'BRL',
        tipo_preco: 'unico',
        ordem_exibicao: 1,
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      },
    ])
  }),

  http.get('*/rest/v1/profiles*', () => {
    return HttpResponse.json({
      id: 'test-user-id',
      full_name: 'Test User',
      email: 'test@example.com',
      status: 'ativo',
      cursos_liberados: ['test-course'],
    })
  }),

  http.get('*/rest/v1/course_videos*', () => {
    return HttpResponse.json([
      {
        id: 'test-video-1',
        course_slug: 'test-course',
        title: 'Test Video 1',
        description: 'Test Description',
        video_url: 'https://youtube.com/watch?v=test',
        duration_minutes: 30,
        order_index: 1,
        preco: null,
      },
    ])
  }),
]