@extends( 'layout.base' )

@section( 'layout.base.body' )
    <div id="page-container" class="flex w-full h-full">
        <div class="container flex flex-col items-center justify-center flex-auto m-4 sm:mx-auto">
            <div class="flex items-center justify-center py-6">
                {{-- <img class="w-32" src="{{ asset( 'svg/nexopos-variant-1.svg' ) }}" alt="PrimePOS"> --}}
            </div>
            <div class="w-full overflow-hidden rounded shadow ns-box md:w-1/2 lg:w-1/3">
                <div id="section-header" class="p-4 ns-box-header">
                    <p class="text-sm text-center b-8">{{ __( "If you see this page, this means PrimePOS is correctly installed on your system. As this page is meant to be the frontend, PrimePOS doesn't have a frontend for the meantime. This page shows useful links that will take you to the important resources." ) }}</p>
                </div>
                <div class="flex border-t shadow ns-box-footer">
                    <div class="flex w-1/3"><a class="w-full py-2 text-sm text-center link" href="{{ ns()->route( 'ns.dashboard.home' ) }}">{{ __( 'Dashboard' ) }}</a></div>
                    <div class="flex w-1/3"><a class="w-full py-2 text-sm text-center link" href="{{ ns()->route( 'ns.login' ) }}">{{ __( 'Sign In' ) }}</a></div>
                    <div class="flex w-1/3"><a class="w-full py-2 text-sm text-center link" href="{{ ns()->route( 'ns.register' ) }}">{{ __( 'Sign Up' ) }}</a></div>
                </div>
            </div>
        </div>
    </div>
@endsection