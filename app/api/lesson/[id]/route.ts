export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
     const id = params.id as string;

     await new Promise(resolve => setTimeout(resolve, 2000))
   
     const task = `Lesson ${id}`
   
     return new Response(JSON.stringify({ taskId: id, task }), { status: 200 })
    } catch (error) {
     console.error(error);

     return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
   };
   
