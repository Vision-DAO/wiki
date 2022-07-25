((nil . ((create-lockfiles . nil)))
 (org-mode. ((eval . (setq org-publish-project-alist
                           (cons
                            (let ((based (file-name-as-directory (projectile-project-root))))
                              (list "roadmap"
                                    :base-directory (concat based "content")
                                    :recursive t
                                    :publishing-directory (concat based "public")
                                    :index-filename "Status.org"
                                    :index-title "Vision Development Roadmap"))
                            (cond ((boundp 'org-publish-project-alist) org-publish-project-alist)
                                  (t '()))))))))
