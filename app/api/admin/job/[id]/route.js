
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function DELETE(_, { params }){
    const id = params.id
  
    const supabase = createRouteHandlerClient({ cookies })
  
    const { error } = await supabase.from('Job')
      .delete()
      .eq('Id', id)
    
    return NextResponse.json({ error })
  }

export async function PUT(request, {params}){
    const job = await request.json()
    const id = params.id

    const supabase = createRouteHandlerClient({cookies})
    
    const { data, error } = await supabase.from('Job')
        .update({ 'Title': job.Title, 'Description': job.Description, 'Location': job.Location, 'Salary': job.Salary, 'Type': job.Type})
        .eq('Id', id)
        .select()

    return NextResponse.json({data, error})
}