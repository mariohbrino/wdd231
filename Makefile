
env: # Set UV_PROJECT_ENVIRONMENT variable for conda environment.
	@mkdir -p $$CONDA_PREFIX/etc/conda/activate.d
	@echo 'export UV_PROJECT_ENVIRONMENT="$$CONDA_PREFIX"' > $$CONDA_PREFIX/etc/conda/activate.d/env_vars.sh
