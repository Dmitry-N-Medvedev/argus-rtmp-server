import { resolve } from 'path';

export const vars=({
    directory,
    sources,
    distro,
  }) => {
    const _sources=resolve(directory, sources);
    const _distro=resolve(directory, distro);
    const _prefix=resolve(_distro, 'usr/local');

    return {
      zlib: {
        GIT: "https://github.com/madler/zlib.git",
        SOURCES: resolve(_sources, 'zlib'),
        PREFIX: _prefix,
        COMMANDS: [
          ['./configure', [
            `--prefix=${_prefix}`,
          ]],
          ['make', []],
          ['make', [
            'install',
          ]],
        ],
      },
      openssl: {
        GIT: "https://github.com/openssl/openssl.git",
        SOURCES: resolve(_sources, 'openssl'),
        PREFIX: _prefix,
        COMMANDS: [
          ['./config', [
            `--prefix=${_prefix}`,
            '--release',
            `--openssldir=${_prefix}/ssl`,
            'no-deprecated',
            'no-legacy',
          ]],
          ['make', []],
          ['make', [
            'install',
          ]],
        ],
      },
      'nginx-rtmp-module': {
        // GIT: "https://github.com/chetandhembre/nginx-rtmp-module.git",
        GIT: "https://github.com/sergey-dryabzhinsky/nginx-rtmp-module.git",
        SOURCES: resolve(_sources, "nginx-rtmp-module"),
        NGINX_SOURCES: resolve(_sources, "nginx"),
        COMMANDS: [
          // ['./auto/configure', [
          //   `--add-module=${resolve(_sources, "nginx-rtmp-module")}`,
          // ]],
          // ['make', []],
          // ['make', [
          //   'install',
          // ]],
        ],
      },
      nginx: {
        GIT: "https://github.com/nginx/nginx.git",
        SOURCES: resolve(_sources, "nginx"),
        PREFIX: resolve(_distro, "usr/share/nginx"),
        SBIN_PATH: resolve(_distro, "usr/sbin/nginx"),
        MODULES_PATH: resolve(_distro, "usr/lib/nginx/modules"),
        CONF_PATH: resolve(_distro, "etc/nginx/nginx.conf"),
        ERROR_LOG_PATH: resolve(_distro, "var/log/nginx/error.log"),
        HTTP_LOG_PATH: resolve(_distro, "var/log/nginx/access.log"),
        PID_PATH: resolve(_distro, "run/nginx.pid"),
        LOC_PATH: resolve(_distro, "var/lock/nginx.lock"),
        USER: "www-data",
        GROUP: "www-data",
        BUILD: "advertima",
        COMMANDS: [
          ['./auto/configure', [
            `--prefix=${resolve(distro, 'usr/share/nginx')}`,
            `--sbin-path=${resolve(distro, 'usr/sbin/nginx')}`,
            `--modules-path=${resolve(distro, 'usr/lib/nginx/modules')}`,
            `--conf-path=${resolve(distro, 'etc/nginx/nginx.conf')}`,
            `--error-log-path=${resolve(distro, 'var/log/nginx/error.log')}`,
            `--pid-path=${resolve(distro, 'var/run/nginx.pid')}`,
            `--http-log-path=${resolve(distro, 'var/log/nginx/access.log')}`,
            `--lock-path=${resolve(distro, 'var/lock/nginx.lock')}`,
            `--user=www-data`,
            `--group=www-data`,
            `--build=advertima`,
            '--without-select_module',
            '--with-poll_module',
            '--with-threads',
            '--with-http_ssl_module',
            '--with-http_v2_module',
            '--without-http_upstream_hash_module',
            '--without-http_upstream_ip_hash_module',
            '--without-http_upstream_least_conn_module',
            '--without-http_upstream_random_module',
            '--without-http_upstream_keepalive_module',
            '--without-http_upstream_zone_module',
            '--without-http-cache',
            '--without-mail_pop3_module',
            '--without-mail_imap_module',
            '--without-mail_smtp_module',
            '--without-stream_limit_conn_module',
            '--without-stream_access_module',
            '--without-stream_geo_module',
            '--without-stream_map_module',
            '--without-stream_split_clients_module',
            '--without-stream_return_module',
            '--without-stream_upstream_hash_module',
            '--without-stream_upstream_least_conn_module',
            '--without-stream_upstream_random_module',
            '--without-stream_upstream_zone_module',
            '--without-http_rewrite_module',
            `--with-openssl=${resolve(_sources, 'openssl')}`,
            '--with-openssl-opt=enable-ec_nistp_64_gcc_128',
            '--with-openssl-opt=no-nextprotoneg',
            '--with-openssl-opt=no-weak-ssl-ciphers',
            '--with-openssl-opt=no-ssl3',
            `--with-zlib=${resolve(_sources, 'zlib')}`,
            `--add-module=${resolve(_sources, "nginx-rtmp-module")}`,
          ]],
          ['make', []],
          ['make', [
            'install',
          ]],
        ],
      },
    };
};
