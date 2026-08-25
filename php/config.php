<?php
declare(strict_types=1);

// Webflow SDK configuration

class WebflowConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Webflow",
                "slug" => "webflow",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.webflow.com/v2",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "collection" => [],
                    "item" => [],
                    "site" => [],
                ],
            ],
            "entity" => [
        'collection' => [
          'fields' => [
            [
              'name' => 'createdOn',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'displayName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slug',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'collection',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'site_id',
                        'orig' => 'site_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sites/{site_id}/collections',
                  'parts' => [
                    'sites',
                    '{site_id}',
                    'collections',
                  ],
                  'select' => [
                    'exist' => [
                      'site_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.collections`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'collection_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/collections/{collection_id}',
                  'parts' => [
                    'collections',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'collection_id' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'site',
              ],
            ],
          ],
        ],
        'item' => [
          'fields' => [
            [
              'name' => 'cmsLocaleId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fieldData',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastPublished',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastUpdated',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'item',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'collection_id',
                        'orig' => 'collection_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/collections/{collection_id}/items',
                  'parts' => [
                    'collections',
                    '{collection_id}',
                    'items',
                  ],
                  'select' => [
                    'exist' => [
                      'collection_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.items`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'collection_id',
                        'orig' => 'collection_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'item_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/collections/{collection_id}/items/{item_id}',
                  'parts' => [
                    'collections',
                    '{collection_id}',
                    'items',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'item_id' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'collection_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.fieldData`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'collection',
              ],
            ],
          ],
        ],
        'site' => [
          'fields' => [
            [
              'name' => 'createdOn',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'displayName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastPublished',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'shortName',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'site',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sites',
                  'parts' => [
                    'sites',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.sites`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'site_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sites/{site_id}',
                  'parts' => [
                    'sites',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'site_id' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return WebflowFeatures::make_feature($name);
    }
}
