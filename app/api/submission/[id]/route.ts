export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    console.log(body.code);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const submissionResult = Math.random() > 0.5;

    return new Response(JSON.stringify({ submissionResult, code: body.code }), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
  }
};
