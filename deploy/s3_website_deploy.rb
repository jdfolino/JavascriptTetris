require 'rubygems'
require 'bundler/setup'
require 'aws-sdk'

class S3WebsiteDeploy

  def initialize(access_key, secret_key)
    @sync_dir="../web/build/"
    credentials(access_key, secret_key)
    @s3 = Aws::S3::Resource.new(region:'ap-southeast-2')
    @bucket = @s3.bucket('jdf-tetris')
  end

  def credentials(access_key, secret_key)
    aws_credentials = Aws::Credentials.new(access_key, secret_key)
    Aws.config.update({
                          region: 'sydney',
                          credentials: aws_credentials
                      })
  end

  def clean
    @bucket.clear!
  end

  def sync
    files = Dir.glob("#{@sync_dir}**/*")
    files.each do |f|
      if File.file?(f)
        obj = @bucket.object(f.sub(@sync_dir, ""))
        obj.upload_file(f, acl: 'public-read')
      end
    end
  end

end