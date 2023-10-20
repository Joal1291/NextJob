
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function DELETE(_, { params }){
    const id = params.id
  
    const supabase = createRouteHandlerClient({ cookies })
  
    const { error } = await supabase.from('Application')
      .delete()
      .eq('Id', id)
    
    return NextResponse.json({ error })
  }

export async function PUT(request, {params}){
    const application = await request.json()
    const id = params.id

    const supabase = createRouteHandlerClient({cookies})
    
    const { data, error } = await supabase.from('Application')
        .update({ 'Status': application.Status, 'CandidatId': application.CandidatId, 'JobId': application.JobId })
        .eq('Id', id)
        .select()

    console.log(id)
    console.log(data, error)
    return NextResponse.json({data, error})
}