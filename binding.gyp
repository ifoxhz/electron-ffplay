{
    'targets': [
        {
            'target_name': 'node-ffplay-darwin-x64.abi-72.dylib',
            'cflags': ['-DHAVE_NANOSLEEP', '-pthread','-w','-Wdiscarded-qualifiers'],
            'cflags_cc': ['-DHAVE_NANOSLEEP', '-pthread','-w','-Wdiscarded-qualifiers'],
            'sources': ['node-ffplay/src/player.cc', 'node-ffplay/src/player.h', 'node-ffplay/src/wrap.cc'],
            'include_dirs': ['<!@(node -p \'require("node-addon-api").include\')'],
            'libraries': [],
            'dependencies': [
                '<!(node -p \'require("node-addon-api").gyp\')'
            ],
            'defines': [
                'NAPI_CPP_EXCEPTIONS','BUILD_WITH_VIDEO_FILTER'
            ],
            'conditions': [
                ['OS=="mac"', {
                    'xcode_settings': {
                        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
                        'MACOSX_DEPLOYMENT_TARGET': '12.0',
                        'OTHER_CFLAGS': ['-w','-Wdiscarded-qualifiers','-Wl','-DCONFIG_AVFILTER','-DBUILD_WITH_VIDEO_FILTER'],
			            'OTHER_LDFLAGS': []
                    },
                    'libraries': [
                        '/usr/local/lib/libSDL2.dylib',
                        '/usr/local/lib/libSDL2_image.dylib',
			            '/usr/local/lib/libkooda.dylib',
			            '/usr/local/lib/libestor_sdk_src.dylib',
                        '/usr/local/yong/ffmpeg/lib/libavcodec.dylib',
                        '/usr/local/yong/ffmpeg/lib/libavformat.dylib',
                        '/usr/local/yong/ffmpeg/lib/libavfilter.dylib',
                        '/usr/local/yong/ffmpeg/lib/libavutil.dylib'
                    ],
                    'include_dirs': [
                        '/usr/local/include/SDL2',
                        '/usr/local/yong/ffmpeg/include/libavcodec',
                        '/usr/local/yong/ffmpeg/include/libavdevice',
                        '/usr/local/yong/ffmpeg/include/libavfilter',
                        '/usr/local/yong/ffmpeg/include/libavformat',

                    ]
                }],

                ['OS=="linux" and target_arch=="x64"', {
                    'libraries': [
                        '/usr/lib/x86_64-linux-gnu/libSDL2-2.0.so',
                        '/usr/lib/x86_64-linux-gnu/libSDL2_image-2.0.so'
                    ],
                    'include_dirs': [
                        '/usr/include/SDL2'
                    ]
                }],

                ['OS=="linux" and target_arch=="ia32"', {
                    'libraries': [
                        '/usr/lib/libSDL2-2.0.so',
                        '/usr/lib/libSDL2_image-2.0.so'
                    ],
                    'include_dirs': [
                        '/usr/include/SDL2'
                    ]
                }]
            ]
        }
    ]
}
