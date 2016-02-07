require 'rubygems'
require 'bundler/setup'
require_relative 's3_website_deploy'

access_key="key"
secret_key="secret"
s3wd = S3WebsiteDeploy.new(access_key, secret_key)
s3wd.clean
s3wd.sync